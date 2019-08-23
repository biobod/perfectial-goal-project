import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import RejectEventsPage from './RejectEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGetUserEventsByType } from '../../APIUtilites/apiQuery';

const styles = {};


const RejectEventsPageContainer = compose(
  graphql(onGetUserEventsByType, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.CANCEL },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
  withStyles(styles),
)(RejectEventsPage);

export default RejectEventsPageContainer;
