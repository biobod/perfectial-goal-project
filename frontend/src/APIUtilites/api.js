import ApolloClient, { gql, InMemoryCache, HttpLink } from 'apollo-boost';
import { uri } from '../../../config/config';

const cache = new InMemoryCache();

const getUserFromStorage = () => {
  const result = localStorage.getItem('user');
  if (!result) return { token: '', _id: '' };
  const { token, _id } = JSON.parse(result);
  if (!token || !_id) {
    return { token: '', _id: '' };
  }
  return { token, _id };
};

cache.writeData({
  data: {
    localStorageUser: { ...getUserFromStorage(), __typename: 'localStorageUser' },
  },
});

export const client = new ApolloClient({
  cache,
  uri,
  link: new HttpLink({ uri }),
  resolvers: {
    User: {
      setUser: (user) => {
        console.log(user);
        return user;
      },
    },
  },
});


class Api {
  getGraphUser = () => {
    client
      .query({ query: gql`{getUser(_id: "5d1e02a722e8b20e89a9738c") { name email }}` })
      .then(console.log);
  }

  getUsers = () => {
    client
      .query({ query: gql`{users { name email _id }}` })
      .then(console.log);
  }

  loginUser = async ({ email, password }) => {
    const method = 'loginUser';
    const data = await client
      .query({ query: gql`{${method}(email: "${email}", password: "${password}") { name email _id token }}` })
      .then(res => res.data[method]);
    const { token, _id } = data;
    const localData = {
      token,
      _id,
    };
    localStorage.setItem('user', JSON.stringify(localData));
    cache.writeData({
      data: {
        localStorageUser: { ...getUserFromStorage(), __typename: 'localStorageUser' },
      },
    });
    return data;
  }

  saveUser = ({ name, password, email }) => {
    const method = 'saveUser';
    return client
      .mutate({ mutation: gql`mutation {${method}(email: "${email}", password: "${password}", name: "${name}") { name email _id }}` })
      .then(res => res.data[method]);
  }
}

const api = new Api();
export default api;
