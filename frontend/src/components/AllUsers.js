import React, { Component } from 'react';
import { Query } from "react-apollo";
import { gql } from 'apollo-boost';


class AllUsers extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Query
          query={gql`{users { name email _id }}`}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.users.map(({ name, email }) => (
              <div key={name}>
                <p>{name}: {email}</p>
              </div>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default AllUsers;
