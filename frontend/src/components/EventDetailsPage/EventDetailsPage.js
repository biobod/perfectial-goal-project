import React, { Component } from 'react';

class EventDetailsPage extends Component {
  render() {
    const {
      error, event, loading, classes,
    } = this.props;

    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;
    return (
      <div className={classes.root}>
        {event.name}
      </div>
    );
  }
}

export default EventDetailsPage;
