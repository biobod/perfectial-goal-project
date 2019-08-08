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
import { withStyles } from '@material-ui/styles';
import { shape, string, arrayOf } from 'prop-types';

const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

const dateFormat = 'dddd, MMMM Do YYYY, h:mm';

class CardsView extends Component {
  render() {
    const {
      events, classes, history, userName,
    } = this.props;

    return (
      <div className={classes.root}>
        {events.map(event => (
          <Card className={classes.card} key={event._id}>
            <CardHeader
              avatar={(<Avatar aria-label="recipe" className={classes.avatar}>{userName.charAt(0).toUpperCase()}</Avatar>)}
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
              <IconButton aria-label="add to favorites">
                <Icon>favorite</Icon>
              </IconButton>
              <IconButton aria-label="maybe">
                <Icon>thumbs_up_down</Icon>
              </IconButton>
              <IconButton aria-label="cancel">
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
  userName: string,
  events: arrayOf(shape({})).isRequired,
  classes: shape({}).isRequired,
};
CardsView.defaultProps = {
  userName: 'Test',
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    flexFlow: 'row wrap',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    padding: 5,
  },
  gridList: {
    width: '90%',
    textAlign: 'left',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  description: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  content: {
    height: 60,
    whiteSpace: 'nowrap',
  },
  eventCard: {
    opacity: 0.85,
    border: '2px solid transparent',
  },
  hoveredEvent: {
    cursor: 'pointer',
    opacity: 1,
  },

  card: {
    width: 345,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: 'red',
  },
  infoIcon: {
    marginLeft: 'auto',
  },
};

export default withStyles(styles)(CardsView);
