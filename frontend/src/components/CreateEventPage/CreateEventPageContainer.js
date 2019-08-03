import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import CreateEventPage from './CreateEventPage';
import styles from './styles';

const getUserId = gql`
    query user {
        user @client {
            _id
        }
    }
`;

const CreateEventPageContainer = compose(
  graphql(getUserId, { props: ({ data }) => ({ user: data.user }) }),
)(CreateEventPage);

export default withStyles(styles)(CreateEventPage);
