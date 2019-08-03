const { gql } = require('apollo-server-express');

const UserQQLSchema = `{
    name: String
    email: String
    _id: String
    token: String
  }`;

const EventQQLSchema = `{
    name: String
    description: String
    _id: ID
    start: String
    end: String
    creatorId: ID
    contribution: Int
    image: Image
    agreedUsers: [User]
    rejectedUsers: [User]
    maybeUsers: [User]
  }`;

const query = `{
    users: [User]
    getUser(_id: String!): User
    loginUser(email: String!, password: String!): User
    verifyUser(_id: String!, token: String!): User
    getUserEvents(userId: String!): [Event]
   
    allEvents: [Event]
  }`;

const mutation = `{
    saveUser(email: String!, password: String!, name: String!): User
    createEvent(name: String!, description: String!, start: String!, end: String!, creatorId: ID!, contribution: Int!, image: Upload!): Event
  }`;

const typeDefs = gql`
  type User ${UserQQLSchema}
  type Event ${EventQQLSchema}
  type Image {
      _id: ID
      path:  String!
      filename: String!
      mimetype: String
      encoding: String
  }
  
  type Query ${query}
  
  type Mutation ${mutation}
  
`;

module.exports = typeDefs