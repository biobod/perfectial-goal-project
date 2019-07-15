import ApolloClient, { gql, InMemoryCache, HttpLink } from 'apollo-boost';
import { uri } from '../../../config/config';

const cache = new InMemoryCache();
const result = localStorage.getItem('user');

cache.writeData({
  data: {
    user: { ...JSON.parse(result), __typename: 'user' },
  },
});
export const client = new ApolloClient({
  cache,
  uri,
  link: new HttpLink({ uri }),
  resolvers: {},
});


class Api {
  getGraphUser = () => {
    client
      .query({ query: gql`{getUser(_id: "5d1e02a722e8b20e89a9738c") { name email token }}` })
      .then(console.log);
  }

  verifyUser = async () => {
    const method = 'verifyUser';
    const localStorageResult = localStorage.getItem('user');
    if (localStorageResult) {
      const { _id, token } = JSON.parse(localStorageResult);
      const user = await client
        .query({ query: gql`{verifyUser(_id: "${_id}", token: "${token}") { name email }}` })
        .then(res => res.data[method]);
      return user;
    }
    return { message: 'sss' };
  }

  getAllGraphUsers = () => {
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
