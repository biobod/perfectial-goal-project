import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import MyEventsPage from './MyEventsPage';

const styles = {};

const onGetUserEvents = gql`
    query getUserEvents($userId: String!) {
        getUserEvents(userId: $userId) {
        name
        description
        start
        end
        contribution
        image {
            path
            filename
        }
        }
    }
`;

const MyEventsPageContainer = compose(
  graphql(onGetUserEvents, {
    options: props => ({
      variables: { userId: props.user._id },
    }),
    props: ({ data: { getUserEvents, error, loading } }) => ({ events: getUserEvents, error, loading }),
  }),
)(MyEventsPage);

export default withStyles(styles)(MyEventsPageContainer);
