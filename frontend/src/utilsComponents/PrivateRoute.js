import React from 'react';
import {
  oneOfType, node, func, shape,
} from 'prop-types';
import { Redirect, Route } from 'react-router';
import { Query, ApolloConsumer } from 'react-apollo';
import { getLocalUser } from '../APIUtilites/clientQuery';
import { verifyUser } from '../APIUtilites/apiQuery';

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
                  console.log({user}, localStorageUser)
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

PrivateRoute.propTypes = {
  location: shape({}),
  component: oneOfType([node, func]).isRequired,
};
PrivateRoute.defaultProps = {
  location: null,
};
export default PrivateRoute;
