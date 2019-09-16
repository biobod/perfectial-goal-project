import times from 'lodash/times';

export const event = {
  creatorId: 12,
  name: 'New Event',
  description: 'some',
  contribution: null,
  _id: '5d440a614a73ceb03e09be4d',
  image: {
    path: './some/imageName',
    filename: 'imageName',
  },
  agreedUsers: [],
  maybeUsers: [],
  rejectedUsers: [],
  start: '1764830000000',
  end: '1714837200000',
};

export const generateManyEvents = (count = 5) => times(count, index => ({
  ...event,
  name: `event-name-${index}`,
  _id: `event-id-${index}`,
}));
