import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { uri } from '../../../config/config';
import api from '../APIUtilites/api';

const client = new ApolloClient({ uri });

class MainPage extends Component {
  getGraphUser = () => {
    client
      .query({ query: gql`{getUser(_id: "5d1e02a722e8b20e89a9738c") { name email }}` })
      .then(result => console.log(result));
  }

  getAllGraphUsers = () => {
    client
      .query({ query: gql`{users { name email _id }}` })
      .then(result => console.log(result));
  }

  getAllUsers = () => api.getUsers().then(console.log).catch(e => console.log('Error', e));


  render() {
    return (
      <div>
        <Link to="/second">Second Page</Link>
        <Link to="/login">Login Page</Link>
        <div>React Goal Project</div>
        <button type="button" onClick={this.getGraphUser}>get Graph User</button>
        <button type="button" onClick={this.getAllGraphUsers}>Get all Graph users</button>
        <button type="button" onClick={this.getAllUsers}>Get all users from db</button>

      </div>
    );
  }
}

export default MainPage;
