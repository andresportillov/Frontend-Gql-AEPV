import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $firstname: String!, $email: String!, $lastname: String) {
    updateUser(_id: $_id, input: {firstname: $firstname, email: $email, lastname: $lastname}) {
      _id
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: ID!){
    deleteUser(_id: $_id){
      _id
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  users!:any[];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // this.apollo.watchQuery({
    //   query: GET_USERS
    // }).valueChanges.subscribe((result: any) => {
    //   this.users = result.data && result.data.Users;
    //   console.log('data',result.data.Users);
      
    // })
  }

  updateUser(_id: String, firstname: String, lastname: String, email: String) {
    console.log(_id);
    this.apollo.mutate({
      mutation: UPDATE_USER,
      refetchQueries: [{query: GET_USERS}],
      variables: {
        _id: _id,
        firstname: firstname,
        lastname: lastname,
        email: email
      }
    }).subscribe(() => {
      console.log('Update Succefully');
    })
  }

  deleteUser(_id: String) {
    console.log(_id);
    this.apollo.mutate({
      mutation: DELETE_USER,
      refetchQueries: [{query: GET_USERS}],
      variables: {
        _id: _id
      },
    }).subscribe(() => {
      console.log('Delete Succefully');
      
    })
  }

}
  