import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import HomePageContainer from '../HomePageContainer';
import HomePage from '../HomePage';
import { generateManyEvents } from '../../../../test/mocks';
import { onGeAllFutureEvents } from '../../../APIUtilites/apiQuery';

const events = generateManyEvents(10);

const props = {
  history: {
    push: () => {},
  },
  user: {
    _id: 12,
  },
};

describe('HomePageContainer', () => {
  const mocks = [
    {
      request: {
        query: onGeAllFutureEvents,
      },
      result: {
        data: {
          allFutureEvents: [...events],
        },
      },
    },
  ];
  it('<HomePageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomePageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(HomePageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(HomePage).prop('events').length).toEqual(10);
  });
});
