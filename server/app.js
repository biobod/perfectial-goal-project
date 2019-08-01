const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const bodyParser =  require('body-parser');
const config = require('../config/config');
const mongoose = require('mongoose');
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const { port, graphqlPath } = config;
const { graphqlUploadExpress }  = require('graphql-upload')

const dbPath = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'

mongoose.connect(dbPath).then(() => console.log('DB connected'))
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, "DB error"))


const server = new ApolloServer({ typeDefs, resolvers });
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
// app.use(graphqlPath, graphqlUploadExpress())
server.applyMiddleware({ app, path: graphqlPath });

app.listen(port, () => console.log(`Server is running on port ${port}${server.graphqlPath}`))