import React from 'react';
import { shallow } from 'enzyme';
import { Container, TextField } from '@material-ui/core';
import { SignUpPage } from '../SignUpPage';

const props = {
  classes: {},
  history: {
    push: () => {},
  },
};

describe('SignUpPage', () => {
  it('SignUpPage exist', () => {
    const component = shallow(<SignUpPage {...props} />);
    expect(component.find(Container).length).toEqual(1);
    expect(component.find(TextField).length).toEqual(3);
  });
  it('onChange', () => {
    const component = shallow(<SignUpPage {...props} />);
    const event = { target: { name: 'email', value: 'adam@gmail.com' } };
    expect(component.instance().state.email).toEqual('');
    component.instance().onChange(event);
    expect(component.instance().state.email).toEqual(event.target.value);
  });
});
