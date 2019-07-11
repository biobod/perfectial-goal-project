import React, { Component } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { uri } from '../../../config/config';
import api from '../APIUtilites/api';

const user = {
  name: 'Test',
  lastName: 'Obama',
};

const client = new ApolloClient({ uri });

class MainPage extends Component {
  doCall = () => {
    client
      .query({ query: gql`{books {title   author}}` })
      .then(result => console.log(result));
  }

  saveUser = () => api.saveUser(user).then(console.log).catch(e => console.log('Error', e));

  getUser = () => api.getUser('5cb0963f992e79810f43d1c2').then(console.log).catch(e => console.log('Error', e));

  getAllUsers = () => api.getUsers().then(console.log).catch(e => console.log('Error', e));


  render() {
    return (
      <div>
        <Link to="/second">Second Page</Link>
        <Link to="/login">Login Page</Link>
        <div>React Goal Project</div>
        <button type="button" onClick={this.doCall}>DO api call</button>
        <button type="button" onClick={this.getAllUsers}>Get all users</button>
      </div>
    );
  }
}

export default MainPage;
