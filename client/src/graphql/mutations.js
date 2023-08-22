import { gql } from '@apollo/client';
import { folderFragment } from './fragments';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        role
        isBlocked
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUserMutation($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
        email
        role
        isBlocked
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_FOLDER = gql`
  ${folderFragment}
  mutation CreateFolder($title: String!, $parentDeckFolderId: String) {
    createFolder(title: $title, parentDeckFolderId: $parentDeckFolderId) {
      ...FolderDetails
    }
  }
`