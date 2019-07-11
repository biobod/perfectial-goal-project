const User = require('../models/userModel')

exports.userSave = function (req, res) {
  console.log(req.body)
  const { name, password, email } = req.body
  const user = { name, password, email }
  User.create(user, function (err, data) {
    if(err) {
      console.log('Error saving: ', err)
    }
    res.send(data)
  })
}
exports.getAllUsers = function (req, res) {
  User.find({}, function (err, users) {
    if(err) return next
    res.send(users)
  })
}

exports.getUser = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) return next
    res.send(user)
  })
}
exports.loginUser = function (req, res) {
  const { email = '', password = ''} = req.body
  User.findOne({ email }, function (err, user) {
    if (err) console.log('Error findOne: ', err)

    if(user) {
      user.comparePassword(password, function (err, isMatch) {
        if (err) console.log('Error comparePassword: ', err)
        if (isMatch) {
          res.send(user)
        } else {
          console.log('wrong pass')
        }
      });
    }

  })
}