const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser =  require('body-parser');
const config = require('../config/config');
const userRoute = require('./routes/userRoute')
const { port } = config;


const app = express()
app.use(cors())
app.use('/api/user/', userRoute)
app.post('/api/some/', function (reg, res) {
    res.send('Ogoog')
})
app.listen(port, () => console.log(`Server is running on port ${port}`))