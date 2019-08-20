const Event = require('../models/eventModel')
const moment = require('moment')
const eventUserActions = [ 'agreedUsers', 'rejectedUsers', 'maybeUsers'];

exports.getAllEvents = async () => await Event.find({});
exports.getAllFutureEvents = async () => await Event.find({ start: { $gte: moment().format('YYYY-MM-DDТhh:mm') }});
exports.getEvent = async (id) => await Event.findById(id);
exports.getUserEvents = async (id) => await Event.find({ creatorId: id });
exports.getUserEventsByType = async ({userId, type}) => await Event.find({ [type]: userId });

exports.addUserToEvent = async ({ userId, type, eventId }) => {
  const pullEvents = eventUserActions.filter(e => e !== type);
  const validatedPullEvents = pullEvents.reduce((acc, key) => ({ ...acc, [key]: userId }), {});
  try {
    await Event.updateOne({_id: eventId}, {$push: {[type]: userId}})
    await Event.updateOne({_id: eventId}, {$pull: {...validatedPullEvents}})
  } catch (e) {
    console.log(e)
  }
}
exports.removeUserFromEvent = async ({ userId, type, eventId }) => await Event.updateOne({ _id: eventId }, { $pull: { [type]: userId } } )

exports.eventCreate =  async (data) => {
  try {
    return await Event.create(data)
  } catch (error) {
    return error
  }
}