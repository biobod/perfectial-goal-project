import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import EventDetailsPageContainer from '../EventDetailsPageContainer';
import EventDetailsPage from '../EventDetailsPage';
import { convertEventDatesToNumber } from '../../../helpers';
import { event } from '../../../../test/mocks';
import { onAddUserToEvent, onGetEvent } from '../../../APIUtilites/apiQuery';

const props = {
  classes: {},
  history: {
    push: () => {},
  },
  addUserToEvent: () => {},
  user: {
    _id: 12,
  },
  match: {
    params: {
      eventId: '5d440a614a73ceb03e09be4d',
    },
  },
};

describe('CardContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetEvent,
        variables: {
          eventId: '5d440a614a73ceb03e09be4d',
        },
      },
      result: {
        data: {
          getEvent: { ...event },
        },
      },
    },
  ];
  it('<EventDetailsPageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventDetailsPageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(EventDetailsPageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(EventDetailsPage).prop('event')).toEqual(convertEventDatesToNumber(event));
  });
});
