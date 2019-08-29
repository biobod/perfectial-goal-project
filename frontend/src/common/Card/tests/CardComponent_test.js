import React from 'react';
import { shallow } from 'enzyme';
import CardComponent from '../CardComponent';


const props = {
  user: {
    _id: 123,
  },
  modifyEvent: () => {},
  event: {
    image: {
      path: './some/imageName'
    },
    agreedUsers: [],
    maybeUsers: [],
    rejectedUsers: [],
  },
  classes: {},
  history: {
    push: () => {},
  },
};
describe('SSS', () => {
  it('SOME', () => {
    const component = shallow(<CardComponent {...props} />);
    expect(component).toExist(true);
  });
});
