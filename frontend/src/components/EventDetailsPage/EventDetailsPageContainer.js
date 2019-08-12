import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import EventDetailsPage from './EventDetailsPage';
import { onGetEvent } from '../../APIUtilites/apiQuery';

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
  },
};


const EventDetailsPageContainer = compose(
  graphql(onGetEvent, {
    options: props => ({
      variables: { eventId: props.match.params.eventId },
    }),
    props: ({ data: { getEvent, error, loading } }) => ({ event: getEvent, error, loading }),
  }),
)(EventDetailsPage);

export default withStyles(styles)(EventDetailsPageContainer);
