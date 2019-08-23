import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import EventDetailsPage from './EventDetailsPage';
import { onAddUserToEvent, onGetEvent } from '../../APIUtilites/apiQuery';
import { convertEventDatesToNumber } from '../../helpers';

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
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusSection: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  status: {
    textAlign: 'left',
    fontSize: 20,
  },
};


const EventDetailsPageContainer = compose(
  graphql(onAddUserToEvent, { name: 'addUserToEvent' }),
  graphql(onGetEvent, {
    options: props => ({
      variables: { eventId: props.match.params.eventId },
    }),
    props: ({ data: { getEvent, error, loading } }) => ({ event: convertEventDatesToNumber(getEvent), error, loading }),
  }),
  withStyles(styles),
)(EventDetailsPage);

export default EventDetailsPageContainer;
