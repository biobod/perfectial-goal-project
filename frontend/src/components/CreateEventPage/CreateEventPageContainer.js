import { withStyles } from '@material-ui/styles';
import CreateEventPage from './CreateEventPage';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  fieldWrapper: {
    width: '100%',
    display: 'flex',
  },
  buttonCls: {
    marginTop: '20px',
    justifySelf: 'start',
  },
  dateSection: {
    marginRight: 20,
    textAlign: 'start',
  },
  time: {
    marginLeft: 2,
  },
  dropZone: {
  },
};

export default withStyles(styles)(CreateEventPage);
