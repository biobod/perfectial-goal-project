const { getUser, getAllUsers, loginUser, verifyUser, userSave } = require('../controllers/userController');
const { eventCreate, getAllEvents } = require('../controllers/eventController');

var fs = require('fs');

const resolvers = {
  Query: {
    users: async () => getAllUsers(),
    allEvents: async () => getAllEvents(),
    getUser: (root, {_id}) => getUser(_id),
    loginUser: (root, params) => loginUser(params),
    verifyUser: (root, params) => verifyUser(params),
  },
  Mutation: {
    saveUser: (root, params) => userSave(params),
    createEvent: async (root, params) => {
      console.log(params)
      const { image } = params
      const img = {}
      img.data = fs.readFileSync(image.name)
      img.contentType = image.type
      return eventCreate({...params, image: img})
    },
  }
};

module.exports = resolvers;
