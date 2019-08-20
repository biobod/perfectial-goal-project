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
  agreedUsers: [ID]
  rejectedUsers: [ID]
  maybeUsers: [ID]
}`;

const ImageQQLSchema = `{
  _id: ID,
  path:  String!,
  filename: String!,
  mimetype: String,
  encoding: String,
}`;

const query = `{
  getUser(userId: ID!): User
  loginUser(email: String!, password: String!): User
  verifyUser(_id: String!, token: String!): User
  getUserEvents(userId: String!): [Event]
  getUserEventsByType(userId: String!, type: String!): [Event]
  getEvent(eventId: String!): Event
  allFutureEvents: [Event]
  allEvents: [Event]
}`;

const mutation = `{
  saveUser(email: String!, password: String!, name: String!): User
  createEvent(name: String!, description: String!, start: String!, end: String!, creatorId: ID!, contribution: Int, image: Upload!): Event
  addUserToEvent(userId:  ID!, eventId: ID!, type: String!): Event
  removeUserFromEvent(userId:  ID!, eventId: ID!, type: String!): Event
}`;

const typeDefs = gql`
  type User ${UserQQLSchema}
  type Event ${EventQQLSchema}
  type Image ${ImageQQLSchema}
  type Query ${query}
  type Mutation ${mutation}
`;

module.exports = typeDefs
