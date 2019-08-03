const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const bodyParser =  require('body-parser');
const config = require('../config/config');
const mongoose = require('mongoose');
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const { port, graphqlPath } = config;

const dbPath = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'

mongoose.connect(dbPath).then(() => console.log('DB connected'))
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, "DB error"))

// for drop collections
// db.dropCollection('events', function(err, result) {console.log({err}, {result})});


const server = new ApolloServer({ typeDefs, resolvers });
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use('/uploads', express.static(__dirname + '/uploads'));
server.applyMiddleware({ app, path: graphqlPath });

app.listen(port, () => console.log(`Server is running on port ${port}${server.graphqlPath}`))
app.on('exit', () => app.close())
app.on('uncaughtException', () => app.close())