import React from 'react';
import { shallow } from 'enzyme';
import { generateManyEvents } from '../../../../test/mocks';
import MaybeEventsPage from '../MaybeEventsPage';

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

describe('MaybeEventsPage', () => {
  it('MaybeEventsPage exist', () => {
    const component = shallow(<MaybeEventsPage {...props} />);
    expect(component.find(CardsView).prop('events')).toEqual(props.events);
  });
  it('MaybeEventsPage loading', () => {
    const component = shallow(<MaybeEventsPage {...props} loading />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('MaybeEventsPage error', () => {
    const component = shallow(<MaybeEventsPage {...props} error={{ message: 'some error' }} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
  it('MaybeEventsPage do not have events', () => {
    const component = shallow(<MaybeEventsPage {...props} events={[]} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>You are not have maybe events.</div>');
  });
});
