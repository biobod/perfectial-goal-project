import React from 'react';
import { shallow } from 'enzyme';
import { generateManyEvents } from '../../../../test/mocks';
import MyEventsPage from '../MyEventsPage';

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

describe('MyEventsPage', () => {
  it('MyEventsPage exist', () => {
    const component = shallow(<MyEventsPage {...props} />);
    expect(component.find(CardsView).prop('events')).toEqual(props.events);
  });
  it('MyEventsPage loading', () => {
    const component = shallow(<MyEventsPage {...props} loading />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('MyEventsPage error', () => {
    const component = shallow(<MyEventsPage {...props} error={{ message: 'some error' }} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
});
