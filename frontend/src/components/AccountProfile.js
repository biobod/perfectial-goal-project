import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getUser } from '../APIUtilites/clientQuery';

class AccountProfile extends Component {
  render() {
    return (
      <div>
        <Query query={getUser}>
          {({ data: { user }, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error || !user) return <div> no user found</div>;
            return (
              <div>
                <p>Account Profile page</p>
                <div>
                  <span>Name: </span>
                  <span>{user.name}</span>
                </div>
                <div>
                  <span>Email: </span>
                  <span>{user.email}</span>
                </div>

                <div>
                  <span>id: </span>
                  <span>{user._id}</span>
                </div>

              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AccountProfile;
