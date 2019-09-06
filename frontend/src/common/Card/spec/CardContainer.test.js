import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { Card } from '@material-ui/core';
import CardContainer from '../CardContainer';
import { onGetAuthorName } from '../../../APIUtilites/apiQuery';
import CardComponent from '../CardComponent';

const props = {
  user: {
    _id: '123',
  },
  modifyEvent: () => {},
  event: {
    creatorId: '12',
    image: {
      path: './some/imageName',
    },
    agreedUsers: [],
    maybeUsers: [],
    rejectedUsers: [],
  },
  classes: {},
  history: {
    push: () => {},
  },
};

describe('CardContainer', () => {
  const mocks = [
    {
      request: {
        query: onGetAuthorName,
        variables: {
          userId: '12',
        },
      },
      result: {
        data: {
          getUser: {
            name: 'Stephen King',
          },
        },
      },
    },
  ];
  it('<CardContainer />', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <CardContainer {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find(CardComponent).exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve))
    wrapper.update()
    expect(wrapper.find(CardComponent).prop('authorName')).toEqual('Stephen King');
  });
});
