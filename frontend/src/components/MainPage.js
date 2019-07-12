import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../APIUtilites/api';


class MainPage extends Component {
  render() {
    return (
      <div>
        <Link to="/second">Second Page</Link>
        <br />
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/signup">Sign up Page</Link>
        <div>React Goal Project</div>
        <button type="button" onClick={api.getGraphUser}>get Graph User</button>
        <button type="button" onClick={api.getAllGraphUsers}>Get all users</button>

      </div>
    );
  }
}

export default MainPage;
