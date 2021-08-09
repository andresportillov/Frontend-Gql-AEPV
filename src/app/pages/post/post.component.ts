import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_POST = gql`
  mutation createPost($message: String!, $userId: String) {
    createPost(input: {message: $message, userId: $userId}) {
      message
    }
  }
`;

const GET_POST = gql`
  {
    Posts(data: {}) {
      _id
      message
      posted
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($_id: ID!, $message: String!) {
    updatePost(_id: $_id, input: {message: $message}) {
      _id
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($_id: ID!){
    deletePost(_id: $_id){
      _id
    }
  }
`;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts!: any[];
  isEdited: Boolean = false; 
  show: Boolean = true; 

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.isEdited
    this.show
    this.apollo.watchQuery({
      query: GET_POST
    }).valueChanges.subscribe((result: any) => {
      this.posts = result.data && result.data.Posts;
      console.log('data',result.data.Posts);
    })
  }

  createPost(message: String) {
    this.apollo.mutate({
      mutation: CREATE_POST,
      refetchQueries: [{query: GET_POST}],
      variables: {
        message: message
      }
    }).subscribe(() => {
      console.log('Created Succefully');
      
    })
  }
  
  updatePost(_id: String, message: String) {
    console.log(_id);
    this.apollo.mutate({
      mutation: UPDATE_POST,
      refetchQueries: [{query: GET_POST}],
      variables: {
        _id: _id,
        message: message
      }
    }).subscribe(() => {
      this.isEdited = false;
      this.show = true;
      console.log('Update Succefully');
    })
  }

  deletePost(_id: String) {
    console.log(_id);
    this.apollo.mutate({
      mutation: DELETE_POST,
      refetchQueries: [{query: GET_POST}],
      variables: {
        _id: _id
      },
    }).subscribe(() => {
      console.log('Delete Succefully');
      
    })
  }

  edit(edit: any) {
    this.isEdited = edit.edit
    this.show = false
  }

  visible(visible: any) {
    this.show = visible.visible
  }

}
