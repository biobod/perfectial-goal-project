import React from 'react';
import { mount } from 'enzyme';
import CreateEventPageContainer from '../CreateEventPageContainer';

const props = {
  history: {
    push: () => {},
  },
};

describe('CreateEventPage', () => {
  it('CreateEventPage exist', () => {
    const component = mount(<CreateEventPageContainer {...props} />);
    expect(component).toExist(true);
  });
});
