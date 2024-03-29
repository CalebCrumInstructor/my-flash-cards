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
    isPrivate: Boolean!
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
    isPrivate: Boolean
    parentDeckFolderId: ID
    createdByUserId: ID
  }

  type FolderObjForArr {
    open: Boolean
    _id: String
    title: String
    isPrivate: Boolean
    parentDeckFolderId: ID
    createdByUserId: ID
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
    getAllDecksForUserPrivate: [DeckFolder]
    getDecks(deckIdsArr: [ID]!): [DeckFolder]
    getCardById(cardId: ID!, deckFolderId: ID!): Card
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!, includeStarterDecks: Boolean!): Auth
    loginUser(email: String!, password: String!): Auth
    createFolder(title: String!, parentDeckFolderId: String, isPrivate: Boolean): DeckFolder
    createDeck(title: String!, parentDeckFolderId: String, isPrivate: Boolean): DeckFolder
    createCard(frontContent: String!, backContent: String!, deckFolderId: ID!): Card
    deleteCards(deckFolderId: ID!, cardIdsArr: [ID]!): DeckFolder
    editCard(frontContent: String!, backContent: String!, deckFolderId: ID!, cardId: ID!): Card
    editDeckFolder(title: String!, deckFolderId: String!, isPrivate: Boolean): SuccessObj
    moveDeckFolder(deckFolderId: String!, oldParentFolderId: String, newParentFolderId: String): SuccessObj
    deleteFolder(parentDeckFolderId: String, deckFolderId: String!): DeckFolder
    removeDeckFolderReference(parentDeckFolderId: String, deckFolderId: String!): SuccessObj
  }
`;

module.exports = typeDefs;
