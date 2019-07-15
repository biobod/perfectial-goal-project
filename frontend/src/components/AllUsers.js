import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';


class AllUsers extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Query
          query={gql`{users { name email _id }}`}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.users.map(({ name, email, _id }) => (
              <div key={name}>
                <p>
                  {name}
                    :
                  {' '}
                  {email}
                  {' '}
                  {_id}
                </p>
              </div>
            ));
          }}
        </Query>
        <ApolloConsumer>
          {data => (
            <button type="button" onClick={() => console.log(data)}>get stored data</button>)}
        </ApolloConsumer>
      </div>
    );
  }
}

export default AllUsers;
