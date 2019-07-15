const User = require('../models/userModel')

exports.getAllUsers = async () => await User.find({});
exports.getUser = async (id) => await User.findById(id);
exports.verifyUser = async ({_id, token}) => {
  const user = await User.findById(_id)
  if(user) {
    const idFromToken = await user.compareToken(token)
    console.log(idFromToken);
    return _id === idFromToken ? user : new Error('Please login again')
  }
  return new Error('need to login')
}

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if(user) {
    const {isMatch, token} = await user.comparePassword(password, user._id);
    user.token = token;
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

