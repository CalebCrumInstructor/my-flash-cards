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
    createdAt
    updatedAt
  }
`;

// Define the recursive query using the fragment
export const GET_ROOT_FOLDER = gql`
  ${folderFragment}
  query GetRootFolderDepthOfFour {
    rootFolderDepthOfFour {
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
`;