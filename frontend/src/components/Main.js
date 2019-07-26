import React, { Component, Fragment } from 'react';
import { Switch } from 'react-router-dom';
import AllUsers from './AllUsers';
import HomePage from './HomePage';
import AccountProfile from './AccountProfile';
import PrivateRoute from '../utilsComponents/PrivateRoute';
import NavBarWrapper from './NavBarWrapper';

class Main extends Component {
  render() {
    return (
      <NavBarWrapper>
        <Switch>
          <PrivateRoute path="/account_profile" component={AccountProfile} />
          <PrivateRoute path="/all_users" component={AllUsers} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
      </NavBarWrapper>

    );
  }
}

export default Main;
