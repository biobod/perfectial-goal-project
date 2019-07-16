import React, { Component, Fragment } from 'react';
import { Switch } from 'react-router-dom';
import AllUsers from './AllUsers';
import HomePage from './HomePage';
import SecondPage from './SecondPage';
import PrivateRoute from '../utilsComponents/PrivateRoute';
import NavBar from './NavBar';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch>
          <PrivateRoute path="/second" component={SecondPage} />
          <PrivateRoute path="/all_users" component={AllUsers} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
      </Fragment>
    );
  }
}

export default Main;
