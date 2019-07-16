import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const getUser = gql`
  query user {
    user @client {
      name
     _id
     email
    }
  }
`;
const NavBar = () => (
  <Query query={getUser}>
    {({ data: { user }, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error || !user) return <div> no user found</div>;
      return <div>{`user: ${user.name}`}</div>;
    }}
  </Query>
);

NavBar.propTypes = {

};

export default NavBar;
