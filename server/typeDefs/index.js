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
    _id: String
    start: Date
    duration: Number
    creatorId: String
    agreedUsers: Array
    rejectedUsers: Array
    maybeUsers: Array
  }`;

const query = `{
    users: [User]
    getUser(_id: String): User
    loginUser(email: String, password: String): User
    verifyUser(_id: String, token: String): User
  }`;

const mutation = `{
    saveUser(email: String!, password: String!, name: String!): User
    createEvent(name: String!, description: String!, start: Date!, duration: Number!, creatorId: String!): Event
  }`;

const typeDefs = gql`
  type User ${UserQQLSchema}
  type Event ${EventQQLSchema}

  type Query ${query}
  
  type Mutation ${mutation}
`;

module.exports = typeDefs