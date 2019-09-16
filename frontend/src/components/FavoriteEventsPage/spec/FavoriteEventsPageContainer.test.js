import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import FavoriteEventsPageContainer from '../FavoriteEventsPageContainer';
import FavoriteEventsPage from '../FavoriteEventsPage';
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

describe('FavoriteEventsPageContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetUserEventsByType,
        variables: {
          userId: 12,
          type: eventUserActions.AGREE,
        },
      },
      result: {
        data: {
          getUserEventsByType: [...events],
        },
      },
    },
  ];
  it('<FavoriteEventsPageContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <FavoriteEventsPageContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(FavoriteEventsPageContainer).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find(FavoriteEventsPage).prop('events').length).toEqual(10);
  });
});
