import React from 'react';
import moment from 'moment';
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
  const passedEvents = [];

  const futureEvents = events.filter((event) => {
    const isFutureEvent = moment(+event.start).diff(moment()) > 0;
    if (!isFutureEvent) {
      passedEvents.push(event);
    }
    return isFutureEvent;
  });
  return (
    <div className={classes.root}>
      {futureEvents.length ? <h3 className={classes.subheader}>Future events</h3> : ''}
      <div className={classes.section}>
        {futureEvents.map(event => <Card key={event._id} event={event} modifyEvent={modifyEvent} history={history} user={user} />)}
      </div>
      {passedEvents.length ? <h3 className={classes.subheader}>Passed events</h3> : ''}
      <div className={classes.section}>
        {passedEvents.map(event => <Card key={event._id} event={event} modifyEvent={modifyEvent} history={history} user={user} disabled />)}
      </div>
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
