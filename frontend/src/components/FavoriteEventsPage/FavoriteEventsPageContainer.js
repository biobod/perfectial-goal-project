import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import FavoriteEventsPage from './FavoriteEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGetUserEventsByType } from '../../APIUtilites/apiQuery';

const styles = {};


const FavoriteEventsPageContainer = compose(
  graphql(onGetUserEventsByType, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.AGREE },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
  withStyles(styles),
)(FavoriteEventsPage);

export default FavoriteEventsPageContainer;
