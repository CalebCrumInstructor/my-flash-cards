import { gql } from '@apollo/client';

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

// Define the recursive fragment
const folderFragment = gql`
  fragment FolderDetails on DeckFolder {
    _id
    title
    isPublic
    isFolder
    isDeckFolderReference
    cardCount
    parentDeckFolder {
      _id
    }
    createdAt
    updatedAt
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
      }
      folderArr {
        open
        _id
        title
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
        cardCount
      }
      folderArr {
        open
        _id
        title
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