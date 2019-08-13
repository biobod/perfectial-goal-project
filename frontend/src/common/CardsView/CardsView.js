import React from 'react';
import {
  Card, CardHeader, CardMedia, Icon, CardContent, CardActions, Avatar, IconButton,
} from '@material-ui/core';
import moment from 'moment';
import {
  shape, string, arrayOf, func,
} from 'prop-types';
import { eventUserActions } from '../../constants/enums';
import { onGetEvent } from '../../APIUtilites/apiQuery';
import routes from '../../constants/routes';

const { AGREE, CANCEL, MAYBE } = eventUserActions;

const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

const dateFormat = 'dddd, MMMM Do YYYY, h:mm';

const getColor = active => (active ? 'secondary' : '');
const isUserInArray = (userId, usersArray) => usersArray.includes(userId);

const CardsView = ({
  events, classes, history, authorName, user, addUserToEvent, removeUserFromEvent,
}) => {
  const modifyEvent = (eventId, type, isRemoveAction) => {
    const mutate = isRemoveAction ? removeUserFromEvent : addUserToEvent;
    mutate({
      variables: { userId: user._id, eventId, type },
      refetchQueries: [{ query: onGetEvent, variables: { eventId } }],
    });
  };
  return (
    <div className={classes.root}>
      {events.map((event) => {
        const isUserAgreed = isUserInArray(user._id, event.agreedUsers);
        const isUserMaybe = isUserInArray(user._id, event.maybeUsers);
        const isUserRejected = isUserInArray(user._id, event.rejectedUsers);

        return (
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
              <IconButton
                color={getColor(isUserAgreed)}
                disabled={user._id === event.creatorId}
                aria-label="add to favorites"
                onClick={() => modifyEvent(event._id, AGREE, isUserAgreed)}
              >
                <Icon>favorite</Icon>
              </IconButton>
              <IconButton
                color={getColor(isUserMaybe)}
                disabled={user._id === event.creatorId}
                aria-label="maybe"
                onClick={() => modifyEvent(event._id, MAYBE, isUserMaybe)}
              >
                <Icon>thumbs_up_down</Icon>
              </IconButton>
              <IconButton
                aria-label="cancel"
                disabled={user._id === event.creatorId}
                color={getColor(isUserRejected)}
                onClick={() => modifyEvent(event._id, CANCEL, isUserRejected)}
              >
                <Icon>cancel</Icon>
              </IconButton>
              <IconButton
                aria-label="info"
                className={classes.infoIcon}
                onClick={() => history.push(`${routes.EVENT_DETAIL}/${event._id}`)}
              >
                <Icon>info</Icon>
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};
CardsView.propTypes = {
  history: shape({}).isRequired,
  authorName: string,
  events: arrayOf(shape({})).isRequired,
  classes: shape({}).isRequired,
  user: shape({}).isRequired,
  addUserToEvent: func.isRequired,
  removeUserFromEvent: func.isRequired,
};
CardsView.defaultProps = {
  authorName: 'Test',
};

export default CardsView;
