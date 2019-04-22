const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser =  require('body-parser');
const config = require('../config/config');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const { port } = config;

const dbPath = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb'

mongoose.connect(dbPath).then(() => console.log('DB connected'))
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, "DB error"))


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user/', userRoute)

app.listen(port, () => console.log(`Server is running on port ${port}`))