import ApolloClient, { gql, InMemoryCache } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { uri } from '../../../config/config';
import Notification from '../common/Notification/Notification';

export const cache = new InMemoryCache();

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
const errorLink = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const { message } = graphQLErrors[0];
    console.log(message);
    Notification.show({ message });
  }
  if (networkError) {
    console.log(networkError.message);
  }
};

export const client = new ApolloClient({
  cache,
  uri,
  link: createUploadLink(),
  onError: errorLink,
  resolvers: {},
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
  },
});


class Api {
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

  getAllEvents = () => {
    client
      .query({ query: gql`{allEvents { name _id description, image { path } }}` })
      .then(console.log);
  }
}

const api = new Api();
export default api;
