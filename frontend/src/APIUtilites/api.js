import ApolloClient, { gql } from 'apollo-boost';
import { uri } from '../../../config/config';

const client = new ApolloClient({ uri });


class Api {
  getGraphUser = () => {
    client
      .query({ query: gql`{getUser(_id: "5d1e02a722e8b20e89a9738c") { name email }}` })
      .then(console.log);
  }

  getAllGraphUsers = () => {
    client
      .query({ query: gql`{users { name email _id }}` })
      .then(console.log);
  }

  loginUser = ({ email, password }) => {
    const method = 'loginUser';
    return client
      .query({ query: gql`{${method}(email: "${email}", password: "${password}") { name email _id }}` })
      .then(res => res.data[method]);
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
