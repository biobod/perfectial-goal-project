import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SecondPage from './components/SecondPage';
import SignUpPage from './components/SignUpPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/second" component={SecondPage} />
        <Route path="/signup" component={SignUpPage} />
      </BrowserRouter>
    );
  }
}

export default App;
