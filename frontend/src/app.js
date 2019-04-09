import React, { Component } from 'react';
import { Provider } from 'react-redux'
import api from './APIUtilites/api';
import store from './reduxComponents/store'

class App extends Component {
  doCall = () => {
    api.getSome().then(console.log).catch(e => console.log('Error', e));
  }

  render() {
    return (
      <Provider store={store}>
        <div>React Goal Project</div>
        <button onClick={this.doCall}>DO api call</button>
      </Provider>
    );
  }
}

export default App;
