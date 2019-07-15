const { gql } = require('apollo-server-express');

const UserQQLSchema = `{
    name: String
    email: String
    _id: String
    token: String
  }`;

const query = `{
    users: [User]
    getUser(_id: String): User
    loginUser(email: String, password: String): User
    verifyUser(_id: String, token: String): User
  }`;

const mutation = ` {
    saveUser(email: String, password: String, name: String): User
  }`;

const typeDefs = gql`
  type User ${UserQQLSchema}

  type Query ${query}
  
  type Mutation ${mutation}
`;

module.exports = typeDefs