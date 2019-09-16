import React from 'react';
import { shallow } from 'enzyme';
import { generateManyEvents } from '../../../../test/mocks';
import FavoriteEventsPage from '../FavoriteEventsPage';

import CardsView from '../../../common/CardsView/CardsViewContainer';

const props = {
  events: generateManyEvents(10),
  classes: {},
  history: {
    push: () => {},
  },
  user: {
    _id: 123,
  },
};

describe('FavoriteEventsPage', () => {
  it('FavoriteEventsPage exist', () => {
    const component = shallow(<FavoriteEventsPage {...props} />);
    expect(component.find(CardsView).prop('events')).toEqual(props.events);
  });
  it('FavoriteEventsPage loading', () => {
    const component = shallow(<FavoriteEventsPage {...props} loading />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('FavoriteEventsPage error', () => {
    const component = shallow(<FavoriteEventsPage {...props} error={{ message: 'some error' }} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
  it('FavoriteEventsPage do not have events', () => {
    const component = shallow(<FavoriteEventsPage {...props} events={[]} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>You are not have favorite events.</div>');
  });
});
