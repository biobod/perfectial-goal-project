import React, { Component } from 'react';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';

const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

const dateFormat = 'dddd, MMMM Do YYYY, h:mm';

class MyEventsPage extends Component {
  render() {
    const {
      error, events, loading, classes, history, user,
    } = this.props;

    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;
    if (!events || !events.length) {
      return (
        <div>
        You are not have events.
          <Link to="/create_event">Create your first event</Link>
        </div>
      );
    }
    return (
      <div className={classes.root}>
        {events.map(event => (
          <Card className={classes.card}>
            <CardHeader
              avatar={(<Avatar aria-label="recipe" className={classes.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar>)}
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
              <IconButton aria-label="info" className={classes.infoIcon}>
                <Icon onClick={() => history.push(`/event_detail/${event._id}`)}>info</Icon>
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

export default MyEventsPage;
