import React from 'react';
import {
  func, shape, string, bool,
} from 'prop-types';
import {
  Avatar, CardActions, CardContent, CardHeader, CardMedia, Icon, IconButton, Card,
} from '@material-ui/core';
import moment from 'moment';
import { createPath, isUserInArray } from '../../helpers';
import routes from '../../constants/routes';
import { eventUserActions } from '../../constants/enums';

const dateFormat = 'dddd, MMMM Do YYYY, h:mm';
const getColor = active => (active ? 'secondary' : '');
const { AGREE, CANCEL, MAYBE } = eventUserActions;

const CardComponent = ({
  event, classes, history, authorName, user, modifyEvent, disabled,
}) => {
  const isUserAgreed = isUserInArray(user._id, event.agreedUsers);
  const isUserMaybe = isUserInArray(user._id, event.maybeUsers);
  const isUserRejected = isUserInArray(user._id, event.rejectedUsers);
  const isDisabled = disabled || user._id === event.creatorId;
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
          disabled={isDisabled}
          aria-label="add to favorites"
          onClick={() => modifyEvent(event._id, AGREE, isUserAgreed)}
        >
          <Icon>favorite</Icon>
        </IconButton>
        <IconButton
          color={getColor(isUserMaybe)}
          disabled={isDisabled}
          aria-label="maybe"
          onClick={() => modifyEvent(event._id, MAYBE, isUserMaybe)}
        >
          <Icon>thumbs_up_down</Icon>
        </IconButton>
        <IconButton
          aria-label="cancel"
          disabled={isDisabled}
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
};

CardComponent.propTypes = {
  history: shape({}).isRequired,
  authorName: string,
  event: shape({}).isRequired,
  classes: shape({}).isRequired,
  user: shape({}).isRequired,
  modifyEvent: func.isRequired,
  disabled: bool,
};
CardComponent.defaultProps = {
  authorName: '',
  disabled: false,
};
export default CardComponent;
