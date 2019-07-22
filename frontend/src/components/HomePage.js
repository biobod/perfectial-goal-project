import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import api from '../APIUtilites/api';


class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/signup">Sign up Page</Link>
        <br />
        <Link to="/all_users">All users page </Link>
        <div>React Goal Project</div>
        <button type="button" onClick={api.getGraphUser}>get User</button>
        <button type="button" onClick={api.getUsers}>Get all users</button>
        <div>
          <button type="button" onClick={api.createEvent}>create event</button>
          <button type="button" onClick={api.getAllEvents}>getAll events</button>
        </div>
      </Fragment>
    );
  }
}

export default HomePage;
