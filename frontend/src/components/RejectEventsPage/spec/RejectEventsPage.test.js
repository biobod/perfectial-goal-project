import React from 'react';
import { shallow } from 'enzyme';
import { generateManyEvents } from '../../../../test/mocks';
import RejectEventsPage from '../RejectEventsPage';

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

describe('RejectEventsPage', () => {
  it('RejectEventsPage exist', () => {
    const component = shallow(<RejectEventsPage {...props} />);
    expect(component.find(CardsView).prop('events')).toEqual(props.events);
  });
  it('RejectEventsPage loading', () => {
    const component = shallow(<RejectEventsPage {...props} loading />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('RejectEventsPage error', () => {
    const component = shallow(<RejectEventsPage {...props} error={{ message: 'some error' }} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
  it('RejectEventsPage do not have events', () => {
    const component = shallow(<RejectEventsPage {...props} events={[]} />);
    expect(component.find(CardsView).length).toEqual(0);
    expect(component.html()).toEqual('<div>You are not have canceled events.</div>');
  });
});
