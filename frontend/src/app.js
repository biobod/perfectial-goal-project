import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './reduxComponents/store';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SecondPage from './components/SecondPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/second" component={SecondPage} />
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
