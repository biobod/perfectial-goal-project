export const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

export const isUserInArray = (userId, usersArray) => usersArray.includes(userId);
