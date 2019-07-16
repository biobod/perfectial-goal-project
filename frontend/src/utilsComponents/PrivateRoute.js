import React from 'react';

import { Redirect, Route } from 'react-router';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const verifyUser = gql`query verifyUser($id: String!, $token: String!){verifyUser(_id: $id, token: $token) { name email }}`;

const getLocalUser = gql`
  query localStorageUser {
    localStorageUser @client {
      token
      _id
    }
  }
`;
const PrivateRoute = ({ component: RouteComponent, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Query query={getLocalUser}>
        {({ data: { localStorageUser } }) => (
          <Query
            query={verifyUser}
            variables={{ id: localStorageUser._id, token: localStorageUser.token }}
          >
            {({ data, loading, error }) => {
              console.log(data);
              if (loading) return <p>Loading...</p>;
              if (error) {
                console.log('ERRROR');
                return (
                  <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                  />
                );
              }
              return (
                <RouteComponent {...props} />
              );
            }}
          </Query>
        )}
      </Query>
    )}
  />
);

export default PrivateRoute;
