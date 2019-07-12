const User = require('../models/userModel')

exports.getAllUsers = async () => await User.find({});
exports.getUser = async (id) => await User.findById(id);

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if(user) {
    const isMatch = await user.comparePassword(password);
    return isMatch ? user : new Error('Wrong password')
  }
  return new Error('Wrong email')
}

exports.userSave =  async ({ email, password, name }) => {
  console.log('userSave', email)
  try {
    return await User.create({email, password, name})
  } catch (error) {
    return error
  }
}

