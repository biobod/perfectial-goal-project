import React from 'react';
import {
  shape, arrayOf, func,
} from 'prop-types';
import { onGetEvent } from '../../APIUtilites/apiQuery';

import Card from '../Card/CardContainer';

const CardsView = ({
  events, classes, history, user, addUserToEvent, removeUserFromEvent,
}) => {
  const modifyEvent = (eventId, type, isRemoveAction) => {
    const mutate = isRemoveAction ? removeUserFromEvent : addUserToEvent;
    mutate({
      variables: { userId: user._id, eventId, type },
      refetchQueries: [{ query: onGetEvent, variables: { eventId } }],
    });
  };
  if (!events) {
    return null;
  }
  return (
    <div className={classes.root}>
      {events.map(event => <Card event={event} modifyEvent={modifyEvent} history={history} user={user} />)}
    </div>
  );
};
CardsView.propTypes = {
  history: shape({}).isRequired,
  events: arrayOf(shape({})).isRequired,
  classes: shape({}).isRequired,
  user: shape({}).isRequired,
  addUserToEvent: func.isRequired,
  removeUserFromEvent: func.isRequired,
};


export default CardsView;
