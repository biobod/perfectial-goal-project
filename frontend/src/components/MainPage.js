import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../APIUtilites/api';

class MainPage extends Component {
  doCall = () => {
    api.getSome().then(console.log).catch(e => console.log('Error', e));
  }

  render() {
    return (
      <div>
        <Link to="/second">Second Page</Link>
        <Link to="/login">Login Page</Link>
        <div>React Goal Project</div>
        <button onClick={this.doCall}>DO api call</button>
      </div>
    );
  }
}

export default MainPage;
