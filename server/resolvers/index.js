const { getUser, getAllUsers } = require('../controllers/userController')


const resolvers = {
  Query: {
    users: async () => getAllUsers(),
    getUser: (root, {_id}) => getUser(_id)
  },
};

module.exports = resolvers;
