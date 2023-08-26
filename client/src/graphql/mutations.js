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

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($deckFolderId: String!, $parentDeckFolderId: String) {
    deleteFolder(deckFolderId: $deckFolderId, parentDeckFolderId: $parentDeckFolderId) {
      _id
      status
    }
  }
`

export const EDIT_FOLDER_TITLE = gql`
  mutation EditFolderTitle($title: String!, $deckFolderId: String!) {
    editFolderTitle(title: $title, deckFolderId: $deckFolderId) {
      message
    }
  }
`

export const MOVE_DECK_FOLDER = gql`
  mutation MoveDeckFolder($deckFolderId: String!, $oldParentFolderId: String, $newParentFolderId: String) {
    moveDeckFolder(deckFolderId: $deckFolderId, oldParentFolderId: $oldParentFolderId, newParentFolderId: $newParentFolderId) {
      message
    }
  }
`
