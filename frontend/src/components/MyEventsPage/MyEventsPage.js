import React, { Component } from 'react';

const createPath = (path) => {
  const name = path.split('./')[1];
  const validPath = `http://localhost:3000/${name}`;

  return validPath;
};
class MyEventsPage extends Component {
  render() {
    const { error, events, loading } = this.props;
    console.log(events);
    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;
    return (
      <div>
        My events
        {events.map(({ image }) => <img src={createPath(image.path)} />)}
      </div>
    );
  }
}

export default MyEventsPage;
