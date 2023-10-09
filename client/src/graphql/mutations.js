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
  mutation addUserMutation($email: String!, $password: String!, $username: String!, $includeStarterDecks: Boolean!) {
    addUser(email: $email, password: $password, username: $username, includeStarterDecks: $includeStarterDecks) {
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

export const CREATE_CARD = gql`
  mutation CreateCard($frontContent: String!, $backContent: String!, $deckFolderId: ID!) {
    createCard(frontContent: $frontContent, backContent: $backContent, deckFolderId: $deckFolderId) {
      _id
      backContent
      createdAt
      frontContent
      updatedAt
    }
  }
`


export const EDIT_CARD = gql`
  mutation EditCard($frontContent: String!, $backContent: String!, $deckFolderId: ID!, $cardId: ID!) {
    editCard(frontContent: $frontContent, backContent: $backContent, deckFolderId: $deckFolderId, cardId: $cardId) {
      _id
      frontContent
      backContent
      createdAt
      updatedAt
    }
  }
`


export const DELETE_CARDS = gql`
  mutation DeleteCards($deckFolderId: ID!, $cardIdsArr: [ID]!) {
    deleteCards(deckFolderId: $deckFolderId, cardIdsArr: $cardIdsArr) {
      _id
    }
  }
`

export const REMOVE_DECK_FOLDER_REFERENCE = gql`
  mutation RemoveDeckFolderReference($deckFolderId: String!, $parentDeckFolderId: String) {
    removeDeckFolderReference(deckFolderId: $deckFolderId, parentDeckFolderId: $parentDeckFolderId) {
      message
    }
  }
`