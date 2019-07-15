const { getUser, getAllUsers, loginUser, verifyUser, userSave } = require('../controllers/userController')


const resolvers = {
  Query: {
    users: async () => getAllUsers(),
    getUser: (root, {_id}) => getUser(_id),
    loginUser: (root, params) => loginUser(params),
    verifyUser: (root, params) => verifyUser(params),
  },
  Mutation: {
    saveUser: (root, params) => userSave(params),
  }
};

module.exports = resolvers;
