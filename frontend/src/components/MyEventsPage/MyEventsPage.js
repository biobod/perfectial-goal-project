import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const createPath = (path) => {
  const name = path.split('./')[1];
  return `http://localhost:3000/${name}`;
};

class MyEventsPage extends Component {
  render() {
    const {
      error, events, loading, classes, history,
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
        <GridList cellHeight={300} className={classes.gridList}>
          {events.map(event => (
            <GridListTile key={event._id}>
              <img src={createPath(event.image.path)} alt={event.image.filename} />
              <GridListTileBar
                title={event.name}
                subtitle={(
                  <span>
                    <div>{event.description}</div>
                    <div>{event.start}</div>
                  </span>
                )}
                actionIcon={(
                  <IconButton
                    aria-label={`info about ${event.name}`}
                    className={classes.icon}
                    onClick={() => history.push(`/event_detail/${event._id}`)}
                  >
                    <Icon>info</Icon>
                  </IconButton>
                )}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default MyEventsPage;
