import { graphql, compose } from 'react-apollo';
import FavoriteEventsPage from './FavoriteEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGetUserEventsByType } from '../../APIUtilites/apiQuery';


const FavoriteEventsPageContainer = compose(
  graphql(onGetUserEventsByType, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.AGREE },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
)(FavoriteEventsPage);

export default FavoriteEventsPageContainer;
