import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import MaybeEventsPageContainer from '../MaybeEventsPageContainer';
import MaybeEventsPage from '../MaybeEventsPage';
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

describe('MaybeEventsPageContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetUserEventsByType,
        variables: {
          userId: 12,
          type: eventUserActions.MAYBE,
        },
      },
      result: {
        data: {
          getUserEventsByType: [...events],
        },
      },
    },
  ];
  it('<MaybeEventsPageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MaybeEventsPageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(MaybeEventsPageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(MaybeEventsPage).prop('events').length).toEqual(10);
  });
});
