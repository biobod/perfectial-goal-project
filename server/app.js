const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors')
const path = require('path')
const bodyParser =  require('body-parser');
const config = require('../config/config');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const { port, graphqlPath } = config;

const dbPath = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'

mongoose.connect(dbPath).then(() => console.log('DB connected'))
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, "DB error"))

const users = [
  {
    email: "test@test.com",
    name: "testUser",
    _id: "5d1e02a722e8b20e89a9738c",
  },
  {
    email: "test2@test.com",
    name: "testUser2",
    _id: "5d1e059b35ec120f4bca8584"
  }
]

const typeDefs = gql`
  type Users {
    name: String
    email: String
    _id: String
  }

  type Query {
    users: [Users]
    getUser(_id: String): Users
  }
`;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: () => users,
    getUser: (root, {_id}) => users.find( u => u._id === _id)
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express()
server.applyMiddleware({ app, path: graphqlPath });

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user/', userRoute)

app.listen(port, () => console.log(`Server is running on port ${port}${server.graphqlPath}`))