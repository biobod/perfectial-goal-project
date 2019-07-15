import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import api from '../APIUtilites/api';

const verifyUser = gql`query verifyUser($id: String!, $token: String!){verifyUser(_id: $id, token: $token) { name email }}`;

const getLocalUser = gql`
  query user {
    user @client {
      token
      _id
    }
  }
`;

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <Query query={getLocalUser}>
          {({ data: { user } }) => (
            <Query query={verifyUser} variables={{ id: user._id, token: user.token }}>
              {({ data, loading, error }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Redirect to="/login" />;
                return (
                  <Fragment>
                    <Link to="/second">Second Page</Link>
                    <br />
                    <Link to="/login">Login Page</Link>
                    <br />
                    <Link to="/signup">Sign up Page</Link>
                    <br />
                    <Link to="/all_users">All users page </Link>
                    <div>React Goal Project</div>
                    <button type="button" onClick={api.getGraphUser}>get Graph User</button>
                    <button type="button" onClick={api.getAllGraphUsers}>Get all users</button>
                    <button type="button" onClick={api.verifyUser}>Verify user</button>
                  </Fragment>
                );
              }}
            </Query>
          )}
        </Query>

      </Fragment>
    );
  }
}

export default MainPage;
