import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../APIUtilites/api';


class MainPage extends Component {
  constructor() {
    super();
    this.getUser();

    this.state = {
      user: null,
      error: null,
    };
  }

  getUser = async () => {
    api.verifyUser().then(user => this.setState({ user })).catch(error => this.setState({ error }));
  }

  render() {
    const { user, error } = this.state;
    const { history } = this.props;
    console.log(user);
    // if (!user) {
    //   history.push('/login');
    // }
    return (
      <div>
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

      </div>
    );
  }
}

export default MainPage;
