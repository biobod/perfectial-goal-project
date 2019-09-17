import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape, bool, arrayOf } from 'prop-types';
import CardsView from '../../common/CardsView/CardsViewContainer';
import routes from '../../constants/routes';

class MyEventsPage extends Component {
  render() {
    const {
      error, events, loading, history, user,
    } = this.props;

    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;
    if (!events || !events.length) {
      return (
        <div>
        You are not have events.
          <Link to={routes.CREATE}>Create your first event</Link>
        </div>
      );
    }
    return (
      <div>
        <h2>My events</h2>
        <CardsView events={events} history={history} authorName={user.name} user={user} />
      </div>
    );
  }
}

MyEventsPage.propTypes = {
  events: arrayOf(shape({})),
  history: shape({}).isRequired,
  error: shape({}),
  loading: bool.isRequired,
  user: shape({}).isRequired,
};
MyEventsPage.defaultProps = {
  error: null,
  events: [],
};

export default MyEventsPage;
