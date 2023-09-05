import { gql } from '@apollo/client';

// Define the recursive fragment
export const folderFragment = gql`
fragment FolderDetails on DeckFolder {
  _id
  title
  isPrivate
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