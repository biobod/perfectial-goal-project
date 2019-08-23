import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import CardComponent from './CardComponent';
import { onGetAuthorName } from '../../APIUtilites/apiQuery';
import transformEventDate from '../../utilsComponents/transformEventDate';

const styles = {
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

const CardContainer = compose(
  graphql(onGetAuthorName, {
    options: props => ({
      variables: { userId: props.event.creatorId },
    }),
    props: ({ data: { getUser, error, loading } }) => ({ authorName: getUser ? getUser.name : '', error, loading }),
  }),
  withStyles(styles),
  transformEventDate,
)(CardComponent);

export default CardContainer;
