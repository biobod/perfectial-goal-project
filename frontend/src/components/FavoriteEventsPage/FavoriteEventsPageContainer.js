import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import FavoriteEventsPage from './FavoriteEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGeFavoriteEvents } from '../../APIUtilites/apiQuery';

const styles = {};


const FavoriteEventsPageContainer = compose(
  graphql(onGeFavoriteEvents, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.AGREE },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
)(FavoriteEventsPage);

export default withStyles(styles)(FavoriteEventsPageContainer);
