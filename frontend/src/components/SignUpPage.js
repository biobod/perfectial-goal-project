import React, { Component } from 'react';
import LabeledInput from 'Common/LabeledInput';
import api from '../APIUtilites/api';

class SignUpPage extends Component {
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
    e.preventDefault();
    api.saveUser({ name, password, email }).then(console.log).catch(error => console.log('Error', error));
  }

  render() {
    const { name, password, email } = this.state;
    return (
      <div>
        <form>
          <LabeledInput label="email" type="text" name="email" value={email} onChange={this.onChange} />
          <LabeledInput label="name" type="text" name="name" value={name} onChange={this.onChange} />
          <LabeledInput label="password" type="password" name="password" value={password} onChange={this.onChange} />
          <button type="button" onClick={this.onSignUp}>Sign up</button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
