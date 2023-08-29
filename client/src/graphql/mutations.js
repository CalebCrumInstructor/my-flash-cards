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
  mutation CreateFolder($title: String!, $parentDeckFolderId: String, $isPrivate: Boolean) {
    createFolder(title: $title, parentDeckFolderId: $parentDeckFolderId, isPrivate: $isPrivate) {
      ...FolderDetails
    }
  }
`

export const CREATE_DECK = gql`
  ${folderFragment}
  mutation CreateDeck($title: String!, $parentDeckFolderId: String, $isPrivate: Boolean) {
    createDeck(title: $title, parentDeckFolderId: $parentDeckFolderId, isPrivate: $isPrivate) {
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

export const EDIT_DECK_FOLDER = gql`
  mutation editDeckFolder($title: String!, $deckFolderId: String!, $isPrivate: Boolean) {
    editDeckFolder(title: $title, deckFolderId: $deckFolderId, isPrivate: $isPrivate) {
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
