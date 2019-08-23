import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import MyEventsPage from './MyEventsPage';
import { onGetUserEvents } from '../../APIUtilites/apiQuery';

const styles = {};

const MyEventsPageContainer = compose(
  graphql(onGetUserEvents, {
    options: props => ({
      variables: { userId: props.user._id },
    }),
    props: ({ data: { getUserEvents, error, loading } }) => ({ events: getUserEvents, error, loading }),
  }),
  withStyles(styles),
)(MyEventsPage);

export default MyEventsPageContainer;
