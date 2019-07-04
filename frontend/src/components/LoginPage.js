import React, { Component } from 'react';
import LabeledInput from 'Common/LabeledInput';
import api from '../APIUtilites/api';

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
    e.preventDefault();
    api.loginUser({ password, email }).then(console.log).catch(error => console.log('Error', error));
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <LabeledInput label="email" type="text" name="email" value={email} onChange={this.onChange} />
          <LabeledInput label="password" type="password" name="password" value={password} onChange={this.onChange} />
          <button type="button" onClick={this.onLogin}>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
