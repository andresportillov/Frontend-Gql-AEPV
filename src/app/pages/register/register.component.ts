import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation createUser($firstname: String!, $email: String! $lastname: String, $password: String!, $age: String) {
    createUser(input: {firstname: $firstname, email: $email, lastname: $lastname, password: $password, age: $age}) {
      _id
      firstname
      email
    }
  }
`;

const GET_USERS = gql`
  {
    Users(data: {}) {
      _id
      email
      age
      firstname
    }
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!: any[];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_USERS
    }).valueChanges.subscribe((result: any) => {
      this.user = result.data && result.data.Users;
      console.log('data',result.data.Users);
      
    })
  }

  createUser(firstname: String, lastname: String, email: String, password: String, age: String) {
    console.log(firstname, lastname, email, password, age);
    
    this.apollo.mutate({
      mutation: CREATE_USER,
      refetchQueries: [{query: GET_USERS}],
      variables: {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        password: password,
      }
    }).subscribe(() => {
      console.log('Created Succefully');
      
    })
  }


}
