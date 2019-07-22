const mongosse = require('mongoose');

const Schema = mongosse.Schema;


const EventSchema = new Schema({
  name: { type: String, required: true, max: 100, unique: false },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  duration: { type: Number, required: true },
  creatorId: { type: Schema.Types.ObjectID, required: true },
  contribution: {
    price: { type: Number, required: false },
    currency: { type: String, required: false },
  },
  agreedUsers: [Schema.Types.ObjectId],
  rejectedUsers: [Schema.Types.ObjectId],
  maybeUsers: [Schema.Types.ObjectId],
  image: {
    data: Buffer,
    contentType: String,
  },
})

module.exports = mongosse.model('Event', EventSchema);
