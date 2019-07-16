import { gql } from 'apollo-boost';

export const getLocalUser = gql`
  query localStorageUser {
    localStorageUser @client {
      token
      _id
    }
  }
`;
export const getUser = gql`
  query user {
      user @client {
          name
          _id
          email
      }
  }
`;
