import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import CardsViewContainer from '../CardsViewContainer';
import { generateManyEvents } from '../../../../test/mocks';

const props = {
  user: {
    _id: 123,
  },

  modifyEvent: () => {},
  classes: {},
  history: {
    push: () => {},
  },
  events: generateManyEvents(10),
};

describe('CardsViewContainer', () => {
  it('<CardContainer />', async () => {
    const wrapper = mount((
      <MockedProvider addTypename={false}>
        <CardsViewContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(CardsViewContainer).exists()).toBe(true);
  });
});
