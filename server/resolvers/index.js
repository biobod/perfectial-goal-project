const { getUser, getAllUsers, loginUser, verifyUser, userSave } = require('../controllers/userController');
const { eventCreate, getAllEvents, getUserEvents, getEvent } = require('../controllers/eventController');

var fs = require('fs');
const uploadDir = "./uploads";

const storeImage = ({ stream, filename, mimetype, encoding }) => {
  const id = Date.now();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
    .on("error", error => {
      if (stream.truncated)
      // Delete the truncated file
        fs.unlinkSync(path);
      reject(error);
    })
    .pipe(fs.createWriteStream(path))
    .on("error", error => reject(error))
    .on("finish", () => resolve({ path, filename, mimetype, encoding})));
}

const resolvers = {
  Query: {
    users: async () => getAllUsers(),
    allEvents: async () => getAllEvents(),
    getUser: (root, {_id}) => getUser(_id),
    loginUser: (root, params) => loginUser(params),
    verifyUser: (root, params) => verifyUser(params),
    getUserEvents: (root, {userId}) => getUserEvents(userId),
    getEvent: (root, {eventId}) => getEvent(eventId),
  },
  Mutation: {
    saveUser: (root, params) => userSave(params),
    createEvent: async (root, params) => {
      const { image } = params
      const { createReadStream, filename, mimetype, encoding } = await image;
      const stream = createReadStream();
      const validImage = await storeImage({ stream, filename, mimetype, encoding})
      return eventCreate({...params, image: validImage})
    },
  }
};

module.exports = resolvers;
