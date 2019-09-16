import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import {
  Container, Button, TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import api from '../../APIUtilites/api';
import styles from './styles';

export class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSignUp = (e) => {
    const { name, password, email } = this.state;
    const { mutate, history } = this.props;
    e.preventDefault();
    mutate({ variables: { name, password, email } }).then(() => {
      api.loginUser({ name, email, password });
      history.push('/');
    });
  }

  render() {
    const { classes } = this.props;
    const { name, password, email } = this.state;
    return (
      <div>
        <Container className={classes.form}>
          <TextField
            required
            id="Email"
            label="Email"
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            value={email}
            name="email"
          />
          <TextField
            required
            id="name"
            label="Name"
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            value={name}
            name="name"
          />
          <TextField
            required
            id="password"
            label="Password"
            margin="normal"
            variant="outlined"
            onChange={this.onChange}
            type="password"
            value={password}
            name="password"
          />
          <Button variant="contained" color="secondary" className={classes.buttonCls} onClick={this.onSignUp}>Sign up</Button>
        </Container>
      </div>
    );
  }
}
SignUpPage.propTypes = {
  classes: shape({}).isRequired,
  history: shape({}).isRequired,
  mutate: func.isRequired,
};

export const saveUser = gql`
    mutation saveUser($email: String!, $name: String!, $password: String!) {
        saveUser(name: $name, password: $password, email: $email) {
            name email _id
        }
    }
`;


export default withStyles(styles)(graphql(saveUser)(SignUpPage));
