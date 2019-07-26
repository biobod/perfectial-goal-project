import React, { Component } from 'react';
import { shape } from 'prop-types';
import {
  Container, Button, TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import api from '../../APIUtilites/api';
import styles from './styles';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onLogin = (e) => {
    const { email, password } = this.state;
    const { history } = this.props;
    e.preventDefault();
    api.loginUser({ password, email })
      .then(() => history.push('/'))
      .catch(error => console.log('Error', error));
  }

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    return (
      <Container className={classes.form}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          margin="normal"
          variant="outlined"
          onChange={this.onChange}
          value={email}
          name="email"
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          margin="normal"
          variant="outlined"
          onChange={this.onChange}
          value={password}
          name="password"
        />
        <Button variant="contained" color="secondary" className={classes.buttonCls} onClick={this.onLogin}>Login</Button>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  history: shape({}).isRequired,
  classes: shape({}).isRequired,
};
export default withStyles(styles)(LoginPage);
