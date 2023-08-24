const typeDefs = `

  scalar Date
  
  type User {
    _id: ID!
    email: String!
    username: String!
    role: String!
    isBlocked: Boolean!
    rootFolder: [DeckFolder]
    starredFolder: [DeckFolder]
    createdAt: String
    updatedAt: String
  }
  
  type DeckFolder {
    _id: ID!
    title: String!
    isPublic: Boolean!
    isFolder: Boolean!
    cards: [Card]
    cardCount: Int
    parentDeckFolder: DeckFolder
    subFolder: [DeckFolder]
    createdByUser: User
    isDeckFolderReference: Boolean!
    DeckFolderReference: DeckFolder
    status: String
    createdAt: String
    updatedAt: String
  }

  type Card {
    _id: ID!
    frontContent: String
    backContent: String
    createdAt: String
    updatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type DeckObjForArr {
    selected: Boolean
    _id: String
    title: String
    cardCount: Int
    parentDeckFolderId: ID
  }

  type FolderObjForArr {
    open: Boolean
    _id: String
    title: String
    parentDeckFolderId: ID
  }

  type RootFolderDepthOfFourType {
    rootFolder: [DeckFolder]
    deckArr: [DeckObjForArr]
    folderArr: [FolderObjForArr]
  }

  type DeckFolderDepthOfFourType {
    subFolder: [DeckFolder]
    deckArr: [DeckObjForArr]
    folderArr: [FolderObjForArr]
  }

  type SuccessObj {
    message: String
  }

  type Query {
    me: User
    rootFolderDepthOfFour: RootFolderDepthOfFourType
    deckFolderDepthOfFourByIdPrivate(_id: String!): DeckFolderDepthOfFourType
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!): Auth
    loginUser(email: String!, password: String!): Auth
    createFolder(title: String!, parentDeckFolderId: String): DeckFolder
    editFolderTitle(title: String!, deckFolderId: String!): SuccessObj
    deleteFolder(parentDeckFolderId: String, deckFolderId: String!): DeckFolder
  }
`;

module.exports = typeDefs;
