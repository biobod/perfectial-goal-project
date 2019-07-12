const { gql } = require('apollo-server-express');

const UserQQLSchema = `{
    name: String
    email: String
    _id: String
  }`;

const typeDefs = gql`
  type User ${UserQQLSchema}

  type Query {
    users: [User]
    getUser(_id: String): User
  }
`;

module.exports = typeDefs