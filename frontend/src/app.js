import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { shape } from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import { client } from './APIUtilites/api';
import { LoginPage, SignUpPage } from './components/SignUpAndLoginPages';
import AllUsers from './components/AllUsers';
import HomePage from './components/HomePage/HomePageContainer';
import AccountProfile from './components/AccountProfile';
import PrivateRoute from './utilsComponents/PrivateRoute';
import NavBarWrapper from './components/NavBarWrapper/NavBarWrapperContainer';
import CreateEventPage from './components/CreateEventPage/CreateEventPageContainer';
import MyEventsPage from './components/MyEventsPage/MyEventsPageContainer';
import EventDetailsPage from './components/EventDetailsPage/EventDetailsPageContainer';
import FavoriteEventsPage from './components/FavoriteEventsPage/FavoriteEventsPageContainer';
import RejectEventsPage from './components/RejectEventsPage/RejectEventsPageContainer';
import MaybeEventsPage from './components/MaybeEventsPage/MaybeEventsPageContainer';
import routes from './constants/routes';

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
              <Route exact path={routes.LOGIN} component={LoginPage} />
              <Route exact path={routes.SIGNUP} component={SignUpPage} />
              <NavBarWrapper>
                <Switch>
                  <PrivateRoute path={routes.CREATE} component={CreateEventPage} />
                  <PrivateRoute path={routes.MY} component={MyEventsPage} />
                  <PrivateRoute path={routes.FAVORITE} component={FavoriteEventsPage} />
                  <PrivateRoute path={routes.REJECTED} component={RejectEventsPage} />
                  <PrivateRoute path={routes.MAYBE} component={MaybeEventsPage} />
                  <PrivateRoute path={routes.ACCOUNT_PROFILE} component={AccountProfile} />
                  <PrivateRoute path={routes.USERS} component={AllUsers} />
                  <PrivateRoute path={`${routes.EVENT_DETAIL}/:eventId`} component={EventDetailsPage} />
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
