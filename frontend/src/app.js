import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { shape } from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import { client } from './APIUtilites/api';
import { LoginPage, SignUpPage } from './components/SignUpAndLoginPages';
import AllUsers from './components/AllUsers';
import HomePage from './components/HomePage';
import AccountProfile from './components/AccountProfile';
import PrivateRoute from './utilsComponents/PrivateRoute';
import NavBarWrapper from './components/NavBarWrapper/NavBarWrapperContainer';
import CreateEventPage from './components/CreateEventPage/CreateEventPageContainer';
import MyEventsPage from './components/MyEventsPage/MyEventsPageContainer';

import './index.css';


const styles = {
  app: {
    height: '100%',
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
              <NavBarWrapper>
                <Switch>
                  <PrivateRoute path="/create_event" component={CreateEventPage} />
                  <PrivateRoute path="/my_events" component={MyEventsPage} />
                  <PrivateRoute path="/account_profile" component={AccountProfile} />
                  <PrivateRoute path="/all_users" component={AllUsers} />
                  <PrivateRoute exact path="/" component={HomePage} />
                </Switch>
              </NavBarWrapper>
            </Switch>
          </div>

        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
App.propTypes = {
  classes: shape({}).isRequired,
};
export default withStyles(styles)(App);
