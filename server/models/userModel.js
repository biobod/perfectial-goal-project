const mongosse = require('mongoose');
const Schema = mongosse.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100},
  lastName: { type: String, required: false, max: 100},
})

module.exports = mongosse.model('User', UserSchema);
