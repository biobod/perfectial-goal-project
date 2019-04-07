import React, { Component } from 'react';
import api from './APIUtilites/api';

class App extends Component {
  doCall = () => {
    api.getSome().then(console.log).catch(e => console.log('Error', e));
  }

  render() {
    return (
      <div>
        <div>React Goal Project</div>
        <button onClick={this.doCall}>DO api call</button>
      </div>
    );
  }
}

export default App;
