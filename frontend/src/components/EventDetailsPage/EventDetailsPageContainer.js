import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import EventDetailsPage from './EventDetailsPage';

const styles = {
};

const onGetEvent = gql`
    query getEvent($eventId: String!) {
             getEvent(eventId: $eventId) {
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

const EventDetailsPageContainer = compose(
  graphql(onGetEvent, {
    options: props => ({
      variables: { eventId: props.match.params.eventId },
    }),
    props: ({ data: { getEvent, error, loading } }) => ({ event: getEvent, error, loading }),
  }),
)(EventDetailsPage);

export default withStyles(styles)(EventDetailsPageContainer);
