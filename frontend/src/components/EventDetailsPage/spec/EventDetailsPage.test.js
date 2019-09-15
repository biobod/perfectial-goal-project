import React from 'react';
import { shallow } from 'enzyme';
import EventDetailsPage from '../EventDetailsPage';
import { event } from '../../../../test/mocks';
import { convertEventDatesToNumber } from '../../../helpers';
import { eventUserActions } from '../../../constants/enums';

const { AGREE } = eventUserActions;

const props = {
  event: convertEventDatesToNumber(event),
  classes: {},
  history: {
    push: () => {},
  },
  addUserToEvent: () => {},
  user: {
    _id: 123,
  },
};

describe('EventDetailsPage', () => {
  it('EventDetailsPage exist', () => {
    const component = shallow(<EventDetailsPage {...props} />);
    expect(component.find('.eventDetails').length).toEqual(1);
  });
  it('EventDetailsPage loading', () => {
    const component = shallow(<EventDetailsPage {...props} loading />);
    expect(component.find('.eventDetails').length).toEqual(0);
    expect(component.html()).toEqual('<div> loading </div>');
  });
  it('EventDetailsPage error', () => {
    const component = shallow(<EventDetailsPage {...props} error={{ message: 'some error' }} />);
    expect(component.find('.eventDetails').length).toEqual(0);
    expect(component.html()).toEqual('<div>some error</div>');
  });
  it('onAddUserToEvent', () => {
    const addUserToEvent = jasmine.createSpy('addUserToEvent');

    const component = shallow(<EventDetailsPage {...props} addUserToEvent={addUserToEvent} />);
    expect(addUserToEvent).toHaveBeenCalledTimes(0);
    component.instance().onAddUserToEvent(AGREE);
    expect(addUserToEvent).toHaveBeenCalledTimes(1);
  });
});
