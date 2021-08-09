import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router'

const GET_USER = gql`
      query Users($email: String!, $password: String!){
        Users(data: {email: $email, password: $password}) {
          _id
          email
          password
        }
      }
`;

const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $isOnline: Boolean) {
    updateUser(_id: $_id, input: {isOnline: $isOnline}) {
      _id
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users!:any[];

  constructor(
    private apollo: Apollo,
    private route: Router
    ) { }

  ngOnInit(): void {
  }

  setIsOnline(_id: String) {
    console.log(_id);
    
    const isOnline = true;
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        _id: _id,
        isOnline: isOnline
      }
    }).subscribe(()=> {
      return this.route.navigate
    })
  
  }

  verify(email: String, password: String) {
    this.apollo.watchQuery({
      query: GET_USER,
      variables: {
        email: email,
        password: password
      }
    }).valueChanges.subscribe((result: any)=> {
      this.users = result.data && result.data.Users
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i]; 
      }
    
    })

  }

}
