import React, { Component } from 'react';
import LabeledInput from 'Common/LabeledInput';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onLogin = (e) => {
    e.preventDefault();
    console.log('login');
  }

  render() {
    const { login, password } = this.state;
    return (
      <div>
        <form onSubmit={this.onLogin}>
          <LabeledInput label="name" type="text" name="login" value={login} onChange={this.onChange} />
          <LabeledInput label="password" type="password" name="password" value={password} onChange={this.onChange} />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
