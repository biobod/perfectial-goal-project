import React from 'react';

import { Redirect, Route } from 'react-router';
import { Query, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';

const verifyUser = gql`query verifyUser($id: String!, $token: String!){verifyUser(_id: $id, token: $token) { name email, _id }}`;

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
          <ApolloConsumer>
            {client => (
              <Query
                query={verifyUser}
                variables={{ id: localStorageUser._id, token: localStorageUser.token }}
              >
                {({ data: { verifyUser: user }, loading, error }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) {
                    return (
                      <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location },
                      }}
                      />
                    );
                  }
                  client.writeData({ data: { user } });
                  return (
                    <RouteComponent {...props} />
                  );
                }}
              </Query>
            )}
          </ApolloConsumer>
        )}
      </Query>
    )}
  />
);

export default PrivateRoute;
