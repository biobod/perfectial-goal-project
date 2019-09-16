import React from 'react';
import { shallow } from 'enzyme';
import { generateManyEvents } from '../../../../test/mocks';
import HomePage from '../HomePage';

import CardsView from '../../../common/CardsView/CardsViewContainer';

const props = {
  events: generateManyEvents(10),
  classes: {},
  history: {
    push: () => {},
  },
  user: {
    _id: 12,
  },
};

describe('HomePage', () => {
  it('HomePage exist', () => {
    const component = shallow(<HomePage {...props} />);
    expect(component.find(CardsView).prop('events')).toEqual(props.events);
  });
  it('HomePage loading', () => {
    const component = shallow(<HomePage {...props} loading />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('HomePage error', () => {
    const component = shallow(<HomePage {...props} error={{ message: 'some error' }} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
});
