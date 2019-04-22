const User = require('../models/userModel')

exports.test = function (req, res) {
  console.log('Test successful')
}
exports.userSave = function (req, res) {
  console.log(req.body)
  const { name, lastName } = req.body
  const user = {name, lastName}
  User.create(user, function (err, data) {
    if(err) {
      console.log('Error saving: ', err)
    }
    res.send(data)
  })
}
exports.getUser = function (req, res) {
  console.log('user', req.params)

  User.findById(req.params.id, function (err, user) {
    if(err) return next
    res.send(user)
  })
}