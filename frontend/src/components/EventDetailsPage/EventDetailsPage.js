import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { createPath, isUserInArray } from '../../helpers';

const statuses = {
  AGREE: 'I will go',
  MAYBE: 'I maybe go',
  REJECTED: 'Not interesting',
};
const dateFormat = 'dddd, MMMM Do YYYY, h:mm';
class EventDetailsPage extends Component {
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
      .duration(moment(event.end, 'YYYY/MM/DD HH:mm')
        .diff(moment(event.start, 'YYYY/MM/DD HH:mm'))).asHours();

    const isUserAgreed = isUserInArray(user._id, event.agreedUsers);
    const isUserMaybe = isUserInArray(user._id, event.maybeUsers);
    const isUserRejected = isUserInArray(user._id, event.rejectedUsers);

    return (
      <div className={classes.root}>
        <h2>{event.name}</h2>
        <div className={classes.dateSection}>
          <div>
            <span>Start at: </span>
            <span>{moment(event.start).format(dateFormat)}</span>
          </div>
          <div>
            <span>End at: </span>
            <span>{moment(event.end).format(dateFormat)}</span>
          </div>
          <div>
            <span>Duration: </span>
            <span>{duration} hours</span>
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
          <div className={classes.status}>Status: I will go</div>
          <div className={classes.buttonSection}>
            <Button color="secondary" variant="contained">{statuses.AGREE}</Button>
            <Button color="primary" variant="contained">{statuses.MAYBE}</Button>
            <Button variant="contained">{statuses.REJECTED}</Button>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default EventDetailsPage;
