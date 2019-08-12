import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import FavoriteEventsPage from './FavoriteEventsPage';
import { eventUserActions } from '../../constants/enums';

const styles = {};

const onGeFavoriteEvents = gql`
    query getUserEventsByType($userId: String!, $type: String! ) {
        getUserEventsByType(userId: $userId, type: $type) {
            name
            description
            start
            end
            contribution
            creatorId
            _id
            agreedUsers
            rejectedUsers
            maybeUsers
            image {
                path
                filename
            }
        }
    }
`;

const FavoriteEventsPageContainer = compose(
  graphql(onGeFavoriteEvents, {
    options: props => ({
      variables: { userId: props.user._id, type: eventUserActions.AGREE },
    }),
    props: ({ data: { getUserEventsByType, error, loading } }) => ({ events: getUserEventsByType, error, loading }),
  }),
)(FavoriteEventsPage);

export default withStyles(styles)(FavoriteEventsPageContainer);