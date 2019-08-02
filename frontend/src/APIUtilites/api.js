import ApolloClient, {
  gql, InMemoryCache, ApolloLink,
} from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';

import { onError } from 'apollo-link-error';
import { uri } from '../../../config/config';

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
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors -2ewd', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError-342342323', networkError);
  }
});
const link = ApolloLink.from([errorLink, createUploadLink()]);

export const client = new ApolloClient({
  cache, uri, link, resolvers: {},
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
