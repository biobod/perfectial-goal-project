import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, bool, shape } from 'prop-types';
import CardsView from '../../common/CardsView/CardsViewContainer';

class HomePage extends Component {
  render() {
    const {
      error, events, loading, history, user,
    } = this.props;
    if (loading) {
      return <div> loading </div>;
    }
    if (error) return <div>{error.message}</div>;
    return (<CardsView events={events} history={history} authorName="Adam" user={user} />);
  }
}
HomePage.propTypes = {
  events: arrayOf(shape({})),
  history: shape({}).isRequired,
  error: shape({}),
  loading: bool.isRequired,
  user: shape({}).isRequired,
};
HomePage.defaultProps = {
  error: null,
  events: [],
};

export default HomePage;
