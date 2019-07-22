import ApolloClient, {
  gql, InMemoryCache, HttpLink, ApolloLink,
} from 'apollo-boost';
import { onError } from 'apollo-link-error';
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
const httpLink = new HttpLink({ uri });
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors -2ewd', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError-342342323', networkError);
  }
});
const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
  cache,
  uri,
  link,
  resolvers: {
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

  createEvent = () => {
    const data = {
      name: 'Test',
      description: 'bla bla',
      start: '21-12-2019',
      duration: 40,
      creatorId: '5d1e02a722e8b20e89a9738c',
    };
    const method = 'createEvent';
    return client
      .mutate({
        mutation: gql`mutation {${method}(
        name: "${data.name}",
        description: "${data.description}",
        start: "${data.start}",
        duration: ${data.duration},
        creatorId:"${data.creatorId}"
        ) { name }}`,
      })
      .then(res => res.data[method]);
  }

  getAllEvents = () => {
    client
      .query({ query: gql`{allEvents { name _id description }}` })
      .then(console.log);
  }
}

const api = new Api();
export default api;
