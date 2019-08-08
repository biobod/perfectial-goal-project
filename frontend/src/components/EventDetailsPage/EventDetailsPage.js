import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { createPath } from '../helpers';

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
        <div className={classes.buttonSection}>
          <Button color="secondary" variant="contained">I will go</Button>
          <Button color="primary" variant="contained">I maybe go</Button>
          <Button variant="contained"> Not interesting</Button>
        </div>
        )}
      </div>
    );
  }
}

export default EventDetailsPage;
