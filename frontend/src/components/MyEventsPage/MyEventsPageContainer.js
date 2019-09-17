import { graphql, compose } from 'react-apollo';
import MyEventsPage from './MyEventsPage';
import { onGetUserEvents } from '../../APIUtilites/apiQuery';

const MyEventsPageContainer = compose(
  graphql(onGetUserEvents, {
    options: props => ({
      variables: { userId: props.user._id },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEvents, error, loading } }) => ({ events: getUserEvents, error, loading }),
  }),
)(MyEventsPage);

export default MyEventsPageContainer;
