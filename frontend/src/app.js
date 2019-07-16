import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { client } from './APIUtilites/api';
import Main from './components/Main';

import './index.css';

const styles = {
  app: {
    height: '100%',
    padding: 30,
    width: '100%',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
};
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className={classes.app}>

            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Main />
            </Switch>
          </div>

        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default withStyles(styles)(App);
