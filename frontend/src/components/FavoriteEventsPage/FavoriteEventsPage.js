import React, { Component } from 'react';
import { arrayOf, bool, shape } from 'prop-types';
import CardsView from '../../common/CardsView/CardsViewContainer';

class FavoriteEventsPage extends Component {
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
          You are not have favorite events.
        </div>
      );
    }
    return (
      <div>
        <h2>Favorite Events </h2>
        <CardsView events={events} history={history} authorName="Adam" user={user} />
      </div>
    );
  }
}
FavoriteEventsPage.propTypes = {
  events: arrayOf(shape({})),
  history: shape({}).isRequired,
  error: shape({}),
  loading: bool.isRequired,
  user: shape({}).isRequired,
};
FavoriteEventsPage.defaultProps = {
  error: null,
  events: [],
};

export default FavoriteEventsPage;
