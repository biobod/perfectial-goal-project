import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import AllUsers from './components/AllUsers';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SecondPage from './components/SecondPage';
import SignUpPage from './components/SignUpPage';

import { client } from './APIUtilites/api';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/second" component={SecondPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/all_users" component={AllUsers} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
