import React from 'react';
import { shallow } from 'enzyme';
import {
  AppBar,
} from '@material-ui/core';
import { NavBarWrapper } from '../NavBarWrapper';

const props = {
  children: <div />,
  classes: {},
  history: {
    push: () => {},
  },
  user: {
    _id: 12,
  },
};

describe('NavBarWrapper', () => {
  it('NavBarWrapper exist', () => {
    const component = shallow(<NavBarWrapper {...props} />);
    expect(component).toExist(true);
    expect(component.find(AppBar)).toExist(true);
  });
});
