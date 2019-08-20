import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { func, shape, bool } from 'prop-types';
import { createPath, isUserInArray } from '../../helpers';
import { onGetEvent } from '../../APIUtilites/apiQuery';
import { eventUserActions, formats } from '../../constants/enums';

const { AGREE, CANCEL, MAYBE } = eventUserActions;
const { savedDateFormat, cardDateFormat } = formats;

const statuses = {
  AGREE_TEXT: 'I will go',
  MAYBE_TEX: 'I maybe go',
  REJECTED_TEX: 'Not interesting',
};

class EventDetailsPage extends Component {
  onAddUserToEvent = (type) => {
    const { addUserToEvent, user, event } = this.props;
    addUserToEvent({
      variables: { userId: user._id, eventId: event._id, type },
      refetchQueries: [{ query: onGetEvent, variables: { eventId: event._id } }],
    });
  };

  render() {
    const {
      error, event, loading, classes, user,
    } = this.props;

    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;

    const isShowButtons = user._id !== event.creatorId;
    const duration = moment
      .duration(moment(event.end, savedDateFormat)
        .diff(moment(event.start, savedDateFormat))).asHours();

    const isUserAgreed = isUserInArray(user._id, event.agreedUsers);
    const isUserMaybe = isUserInArray(user._id, event.maybeUsers);
    const isUserRejected = isUserInArray(user._id, event.rejectedUsers);
    const statusText = (isUserAgreed && statuses.AGREE_TEXT)
      || (isUserMaybe && statuses.MAYBE_TEX)
      || (isUserRejected && statuses.REJECTED_TEX);

    return (
      <div className={classes.root}>
        <h2>{event.name}</h2>
        <div className={classes.dateSection}>
          <div>
            <span>Start at: </span>
            <span>{moment(event.start).format(cardDateFormat)}</span>
          </div>
          <div>
            <span>End at: </span>
            <span>{moment(event.end).format(cardDateFormat)}</span>
          </div>
          <div>
            <span>Duration: </span>
            <span>{ Number.parseFloat(duration).toFixed(2)} hours</span>
          </div>
        </div>
        <div className={classes.description}>
          <img
            className={classes.image}
            src={createPath(event.image.path)}
            alt={event.image.filename}
          />
          <div>{event.description}</div>
        </div>
        {isShowButtons && (
        <div className={classes.statusSection}>
          <div className={classes.status}>Status: {statusText}</div>
          <div className={classes.buttonSection}>
            <Button color="secondary" variant="contained" onClick={() => this.onAddUserToEvent(AGREE)}>{statuses.AGREE_TEXT}</Button>
            <Button color="primary" variant="contained" onClick={() => this.onAddUserToEvent(MAYBE)}>{statuses.MAYBE_TEX}</Button>
            <Button variant="contained" onClick={() => this.onAddUserToEvent(CANCEL)}>{statuses.REJECTED_TEX}</Button>
          </div>
        </div>
        )}
      </div>
    );
  }
}
EventDetailsPage.propTypes = {
  event: shape({}).isRequired,
  classes: shape({}).isRequired,
  user: shape({}).isRequired,
  addUserToEvent: func.isRequired,
  loading: bool,
  error: shape({}),
};
EventDetailsPage.defaultProps = {
  loading: false,
  error: null,
};
export default EventDetailsPage;
