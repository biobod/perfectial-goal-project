const express = require('express')
const cors = require('cors')
const path = require('path')
const config = require('../config/config');

const { port } = config;

const app = express()
app.use(cors())
// app.get('/', function (reg, res) {
//     res.sendFile(path.join(__dirname+'/templates/index.html'))
// })
app.post('/api/some/', function (reg, res) {
    res.send('Ogoog')
})
app.listen(port)