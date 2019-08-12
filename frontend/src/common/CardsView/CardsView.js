import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import {
  shape, string, arrayOf, func,
} from 'prop-types';
import { eventUserActions } from '../../constants/enums';
import { onGetEvent } from '../../APIUtilites/apiQuery';

const { AGREE, CANCEL, MAYBE } = eventUserActions;

const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

const dateFormat = 'dddd, MMMM Do YYYY, h:mm';

const getColor = (userId, usersArray) => (usersArray.includes(userId) ? 'secondary' : '');

class CardsView extends Component {
  addUserToEvent = (eventId, type) => {
    const { mutate, user } = this.props;
    mutate({
      variables: { userId: user._id, eventId, type },
      refetchQueries: [{ query: onGetEvent, variables: { eventId } }],
    });
  }

  render() {
    const {
      events, classes, history, authorName, user,
    } = this.props;

    return (
      <div className={classes.root}>
        {events.map(event => (
          <Card className={classes.card} key={event._id}>
            <CardHeader
              avatar={(<Avatar aria-label="recipe" className={classes.avatar}>{authorName.charAt(0).toUpperCase()}</Avatar>)}
              title={event.name}
              subheader={moment(event.start).format(dateFormat)}
            />
            <CardMedia
              className={classes.media}
              image={createPath(event.image.path)}
              title={event.name}
            />
            <CardContent className={classes.content}>
              <div className={classes.description}>
                {event.description}
              </div>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton color={getColor(user._id, event.agreedUsers)} aria-label="add to favorites" onClick={() => this.addUserToEvent(event._id, AGREE)}>
                <Icon>favorite</Icon>
              </IconButton>
              <IconButton color={getColor(user._id, event.maybeUsers)} aria-label="maybe" onClick={() => this.addUserToEvent(event._id, MAYBE)}>
                <Icon>thumbs_up_down</Icon>
              </IconButton>
              <IconButton aria-label="cancel" color={getColor(user._id, event.rejectedUsers)} onClick={() => this.addUserToEvent(event._id, CANCEL)}>
                <Icon>cancel</Icon>
              </IconButton>
              <IconButton aria-label="info" className={classes.infoIcon} onClick={() => history.push(`/event_detail/${event._id}`)}>
                <Icon>info</Icon>
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}
CardsView.propTypes = {
  history: shape({}).isRequired,
  authorName: string,
  events: arrayOf(shape({})).isRequired,
  classes: shape({}).isRequired,
  user: shape({}).isRequired,
  mutate: func.isRequired,
};
CardsView.defaultProps = {
  authorName: 'Test',
};

export default CardsView;
