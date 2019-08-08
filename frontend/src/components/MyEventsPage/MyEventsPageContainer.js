import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import MyEventsPage from './MyEventsPage';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    flexFlow: 'row wrap',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    padding: 5,
  },
  gridList: {
    width: '90%',
    textAlign: 'left',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  description: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  content: {
    height: 60,
    whiteSpace: 'nowrap',
  },
  eventCard: {
    opacity: 0.85,
    border: '2px solid transparent',
  },
  hoveredEvent: {
    cursor: 'pointer',
    opacity: 1,
  },
};

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

const MyEventsPageContainer = compose(
  graphql(onGetUserEvents, {
    options: props => ({
      variables: { userId: props.user._id },
    }),
    props: ({ data: { getUserEvents, error, loading } }) => ({ events: getUserEvents, error, loading }),
  }),
)(MyEventsPage);

export default withStyles(styles)(MyEventsPageContainer);
