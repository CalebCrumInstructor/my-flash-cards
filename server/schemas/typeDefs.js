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
    parentDeckFolder: DeckFolder
    subFolder: [DeckFolder]
    createdByUser: User
    isDeckFolderReference: Boolean!
    DeckFolderReference: DeckFolder
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

  type Query {
    me: User
  }

  type Mutation {
    addUser(email: String!, password: String!, username: String!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
