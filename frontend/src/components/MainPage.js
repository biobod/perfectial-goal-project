import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../APIUtilites/api';

const user = {
  name: 'Test',
  lastName: 'Obama',
};

class MainPage extends Component {
  doCall = () => {
    api.getSome().then(console.log).catch(e => console.log('Error', e));
  }

  saveUser = () => api.saveUser(user).then(console.log).catch(e => console.log('Error', e));

  getUser = () => api.getUser('5cb0963f992e79810f43d1c2').then(console.log).catch(e => console.log('Error', e));


  render() {
    return (
      <div>
        <Link to="/second">Second Page</Link>
        <Link to="/login">Login Page</Link>
        <div>React Goal Project</div>
        <button onClick={this.doCall}>DO api call</button>
        <button onClick={this.getUser}>Get user</button>
      </div>
    );
  }
}

export default MainPage;
