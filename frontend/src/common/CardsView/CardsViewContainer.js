import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import CardsView from './CardsView';
import { onAddUserToEvent } from '../../APIUtilites/apiQuery';

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

  card: {
    width: 345,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: 'red',
  },
  infoIcon: {
    marginLeft: 'auto',
  },
};

const CardsViewContainer = compose(graphql(onAddUserToEvent))(CardsView);

export default withStyles(styles)(CardsViewContainer);
