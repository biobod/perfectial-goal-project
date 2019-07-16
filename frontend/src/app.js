import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { client } from './APIUtilites/api';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Main />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
