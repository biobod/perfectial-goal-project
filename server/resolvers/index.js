const { getUser, getAllUsers, loginUser, userSave } = require('../controllers/userController')


const resolvers = {
  Query: {
    users: async () => getAllUsers(),
    getUser: (root, {_id}) => getUser(_id),
    loginUser: (root, params) => loginUser(params),
  },
  Mutation: {
    saveUser: (root, params) => userSave(params),
  }
};

module.exports = resolvers;
