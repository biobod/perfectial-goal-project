import { graphql, compose } from 'react-apollo';
import RejectEventsPage from './RejectEventsPage';
import { eventUserActions } from '../../constants/enums';
import { onGetUserEventsByType } from '../../APIUtilites/apiQuery';

const RejectEventsPageContainer = compose(
  graphql(onGetUserEventsByType, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.CANCEL },
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
)(RejectEventsPage);

export default RejectEventsPageContainer;
