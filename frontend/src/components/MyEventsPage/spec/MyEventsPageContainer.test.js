import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import MyEventsPageContainer from '../MyEventsPageContainer';
import MyEventsPage from '../MyEventsPage';
import { generateManyEvents } from '../../../../test/mocks';
import { onGetUserEvents } from '../../../APIUtilites/apiQuery';

const events = generateManyEvents(10);

const props = {
  history: {
    push: () => {},
  },
  user: {
    _id: 12,
  },
};

describe('MyEventsPageContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetUserEvents,
        variables: {
          userId: 12,
        },
      },
      result: {
        data: {
          getUserEvents: [...events],
        },
      },
    },
  ];
  it('<MyEventsPageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyEventsPageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(MyEventsPageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(MyEventsPage).prop('events').length).toEqual(10);
  });
});
