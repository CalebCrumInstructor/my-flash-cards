import { gql } from '@apollo/client';
import { folderFragment } from './fragments';


export const QUERY_ME = gql`
  query getMeQuery {
    me {
      _id
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;


// Define the recursive query using the fragment
export const GET_ROOT_FOLDER = gql`
  ${folderFragment}
  query GetRootFolderDepthOfFour {
    rootFolderDepthOfFour {
      deckArr {
        selected
        _id
        title
        cardCount
        isPrivate
        parentDeckFolderId
        createdByUserId
      }
      folderArr {
        open
        _id
        title
        isPrivate
        parentDeckFolderId
        createdByUserId
      }
      rootFolder {
        ...FolderDetails
        subFolder {
          ...FolderDetails
          subFolder {
            ...FolderDetails
            subFolder {
              ...FolderDetails
            }
          }
        }
      }
    }
  }
`;

export const GET_SUB_FOLDER_BY_ID_PRIVATE = gql`
  ${folderFragment}
  query GetDeckFolderDepthOfFourByIdPrivate($_id: String!) {
    deckFolderDepthOfFourByIdPrivate(_id: $_id) {
      deckArr {
        selected
        _id
        title
        isPrivate
        cardCount
        createdByUserId
      }
      folderArr {
        open
        _id
        title
        isPrivate
        createdByUserId
      }
      subFolder {
        ...FolderDetails
        subFolder {
          ...FolderDetails
          subFolder {
            ...FolderDetails
            subFolder {
              ...FolderDetails
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_DECKS_FOR_USER_PRIVATE = gql`
  query getAllDecksForUserPrivate {
    getAllDecksForUserPrivate {
      _id
      title
      isPrivate
      parentDeckFolder {
        _id
      }
      cards {
        _id
        backContent
        createdAt
        frontContent
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CARD_BY_ID = gql`
  query GetCardById($cardId: ID!, $deckFolderId: ID!) {
    getCardById(cardId: $cardId, deckFolderId: $deckFolderId) {
      _id
      frontContent
      backContent
      createdAt
      updatedAt
    }
  }
`


export const GET_DECKS = gql`
  query GetDecks($deckIdsArr: [ID]!) {
    getDecks(deckIdsArr: $deckIdsArr) {
      _id
      title
      cards {
        _id
        backContent
        createdAt
        frontContent
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`