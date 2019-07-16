import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import AllUsers from './components/AllUsers';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import SecondPage from './components/SecondPage';
import SignUpPage from './components/SignUpPage';
import PrivateRoute from './utilsComponents/PrivateRoute';
import { client } from './APIUtilites/api';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path="/second" component={SecondPage} />
          <PrivateRoute path="/all_users" component={AllUsers} />
          <PrivateRoute exact path="/" component={MainPage} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
