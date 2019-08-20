import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import CardsView from './CardsView';
import { onAddUserToEvent, onRemoveUserFromEvent } from '../../APIUtilites/apiQuery';

const styles = {
  root: {
    width: '100%',
  },
  subheader: {
    textAlign: 'left',
    padding: '6px 40px',
    borderBottom: '1px solid grey',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    padding: 5,
  },
};

const CardsViewContainer = compose(
  graphql(onAddUserToEvent, { name: 'addUserToEvent' }),
  graphql(onRemoveUserFromEvent, { name: 'removeUserFromEvent' }),
)(CardsView);

export default withStyles(styles)(CardsViewContainer);
