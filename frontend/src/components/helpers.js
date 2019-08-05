export const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};
