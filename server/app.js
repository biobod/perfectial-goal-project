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

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];


const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    books: () => books,
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