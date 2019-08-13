import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import RejectEventsPage from './RejectEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGeFavoriteEvents } from '../../APIUtilites/apiQuery';

const styles = {};


const RejectEventsPageContainer = compose(
  graphql(onGeFavoriteEvents, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.CANCEL },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
)(RejectEventsPage);

export default withStyles(styles)(RejectEventsPageContainer);
