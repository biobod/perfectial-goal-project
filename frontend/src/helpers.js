export const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

export const isUserInArray = (userId, usersArray) => usersArray.includes(userId);

export const convertEventDatesToNumber = (event) => {
  if (!event) return event;
  const modifiedEvent = { ...event };
  if (modifiedEvent.start && modifiedEvent.end) {
    modifiedEvent.start = +event.start;
    modifiedEvent.end = +event.end;
  }
  return modifiedEvent;
};
