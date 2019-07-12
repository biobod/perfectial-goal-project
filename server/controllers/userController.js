const User = require('../models/userModel')

exports.getAllUsers = async () => await User.find({});
exports.getUser = async (id) => await User.findById(id);

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