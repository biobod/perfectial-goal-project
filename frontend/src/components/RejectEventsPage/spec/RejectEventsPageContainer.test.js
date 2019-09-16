import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import RejectEventsPageContainer from '../RejectEventsPageContainer';
import RejectEventsPage from '../RejectEventsPage';
import { generateManyEvents } from '../../../../test/mocks';
import { onGetUserEventsByType } from '../../../APIUtilites/apiQuery';
import { eventUserActions } from '../../../constants/enums';

const events = generateManyEvents(10);

const props = {
  history: {
    push: () => {},
  },
  user: {
    _id: 12,
  },
};

describe('RejectEventsPageContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetUserEventsByType,
        variables: {
          userId: 12,
          type: eventUserActions.CANCEL,
        },
      },
      result: {
        data: {
          getUserEventsByType: [...events],
        },
      },
    },
  ];
  it('<RejectEventsPageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <RejectEventsPageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(RejectEventsPageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(RejectEventsPage).prop('events').length).toEqual(10);
  });
});
