import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import MaybeEventsPage from './MaybeEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGetUserEventsByType } from '../../APIUtilites/apiQuery';

const styles = {};

const MaybeEventsPageContainer = compose(
  graphql(onGetUserEventsByType, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.MAYBE },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
  withStyles(styles),
)(MaybeEventsPage);

export default MaybeEventsPageContainer;
