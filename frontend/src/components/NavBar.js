import React from 'react';
import { Query } from 'react-apollo';
import { getUser } from '../APIUtilites/clientQuery';

const NavBar = () => (
  <Query query={getUser}>
    {({ data: { user }, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (error || !user) return <div> no user found</div>;
      return <div>{`user: ${user.name} ${user._id} ${user.email}`}</div>;
    }}
  </Query>
);


export default NavBar;
