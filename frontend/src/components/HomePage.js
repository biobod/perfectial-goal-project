import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import api from '../APIUtilites/api';

class HomePage extends Component {
  render() {
    const { mutate } = this.props;
    const data = {
      name: 'Test2',
      description: 'some',
      start: '21-10-2019',
      duration: 40,
      creatorId: '5d1e02a722e8b20e89a9738c',
    };
    return (
      <Fragment>
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/signup">Sign up Page</Link>
        <br />
        <Link to="/all_users">All users page </Link>
        <div>React Goal Project</div>
        <div>
          <button type="button" onClick={() => mutate({ variables: { ...data } })}>create event</button>
          <button type="button" onClick={api.getAllEvents}>getAll events</button>
        </div>
      </Fragment>
    );
  }
}

export const createEvent = gql`
    mutation createEvent($name: String!, $description: String!, $start: String!, $duration: Int!, $creatorId: ID!) {
        createEvent(name: $name, description: $description, start: $start, duration: $duration, creatorId: $creatorId) {
            name
            _id
            start
            description
            __typename
        }
    }
`;

export default graphql(createEvent)(HomePage);
