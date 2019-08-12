const Event = require('../models/eventModel')

exports.getAllEvents = async () => await Event.find({});
exports.getEvent = async (id) => await Event.findById(id);
exports.getUserEvents = async (id) => await Event.find({ creatorId: id });
exports.getUserEventsByType = async ({userId, type}) => await Event.find({ [type]: userId });

exports.addUserToEvent = async ({ userId, type, eventId }) => await Event.updateOne({ _id: eventId }, { $push: { [type]: userId } } )

exports.removeUserFromEvent = async ({ userId, type, eventId }) => await Event.updateOne({ _id: eventId }, { $pull: { [type]: userId } } )

exports.eventCreate =  async (data) => {
  try {
    return await Event.create(data)
  } catch (error) {
    return error
  }
}