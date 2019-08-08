import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import FavoriteEventsPage from './FavoriteEventsPage';

const styles = {};

const onGetUserEvents = gql`
    query getUserEvents($userId: String!) {
        getUserEvents(userId: $userId) {
            name
            description
            start
            end
            contribution
            _id
            image {
                path
                filename
            }
        }
    }
`;

const FavoriteEventsPageContainer = compose(
  graphql(onGetUserEvents, {
    options: props => ({
      variables: { userId: props.user._id },
    }),
    props: ({ data: { getUserEvents, error, loading } }) => ({ events: getUserEvents, error, loading }),
  }),
)(FavoriteEventsPage);

export default withStyles(styles)(FavoriteEventsPageContainer);
