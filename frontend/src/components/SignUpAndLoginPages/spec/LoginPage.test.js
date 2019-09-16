import React from 'react';
import { mount, shallow } from 'enzyme';
import { Container, TextField } from '@material-ui/core';
import { LoginPage } from '../LoginPage';

const props = {
  classes: {},
  history: {
    push: () => {},
  },
};

describe('LoginPage', () => {
  it('LoginPage exist', () => {
    const component = shallow(<LoginPage {...props} />);
    expect(component.find(Container).length).toEqual(1);
    expect(component.find(TextField).length).toEqual(2);
  });
  it('onChange', () => {
    const component = shallow(<LoginPage {...props} />);
    const event = { target: { name: 'email', value: 'adam@gmail.com' } };
    expect(component.instance().state.email).toEqual('');
    component.instance().onChange(event);
    expect(component.instance().state.email).toEqual(event.target.value);
  });
  it('handleOnEnter', () => {
    const component = shallow(<LoginPage {...props} />);
    const event = { keyCode: 13 };
    const onLoginSpy = spyOn(component.instance(), 'onLogin');
    expect(onLoginSpy).toHaveBeenCalledTimes(0);
    component.instance().handleOnEnter(event);
    expect(onLoginSpy).toHaveBeenCalledTimes(1);
  });
});
