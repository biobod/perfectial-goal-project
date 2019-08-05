import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import EventDetailsPage from './EventDetailsPage';

const styles = {
  root: {
    maxWidth: 900,
    margin: '0 auto',
  },
  dateSection: {
    display: 'block',
    textAlign: 'left',
    marginBottom: 15,
  },
  description: {
  },
  image: {
    float: 'left',
    marginRight: 10,
    height: 300,
  },
  buttonSection: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
  }
};

const onGetEvent = gql`
    query getEvent($eventId: String!) {
             getEvent(eventId: $eventId) {
            name
            description
            start
            end
            contribution
             creatorId
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
