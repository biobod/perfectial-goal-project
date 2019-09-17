import React from 'react';
import { shallow } from 'enzyme';
import CardsView from '../CardsView';
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

describe('CardsView', () => {
  it('CardsView exist', () => {
    const component = shallow(<CardsView {...props} />);
    expect(component.find('.cardView').length).toEqual(1);
  });
  it('CardsView without events return null', () => {
    const component = shallow(<CardsView {...props} events={null} />);
    expect(component.find('.cardView').length).toEqual(0);
  });
});
