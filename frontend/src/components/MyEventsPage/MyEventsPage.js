import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createPath } from '../helpers';


class MyEventsPage extends Component {
  constructor() {
    super();
    this.state = {
      hoveredEvent: null,
    };
  }

  onHover = id => this.setState({ hoveredEvent: id })

  render() {
    const {
      error, events, loading, classes, history, user,
    } = this.props;
    const { hoveredEvent } = this.state;
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
            <GridListTile
              className={event._id === hoveredEvent ? classes.hoveredEvent : classes.eventCard}
              key={event._id}
              onMouseEnter={() => this.onHover(event._id)}
              onMouseLeave={() => this.onHover(null)}
              onClick={() => history.push(`/event_detail/${event._id}`)}
            >
              <img src={createPath(event.image.path)} alt={event.image.filename} />
              <GridListTileBar
                title={event.name}
                subtitle={(
                  <span>
                    <div>Start at: {moment(event.start).format('dddd, MMMM Do YYYY, h:mm')}</div>
                    <div className={classes.description}>{event.description}</div>
                  </span>
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
