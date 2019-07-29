import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import CreateEventPage from './CreateEventPage';
import styles from './styles';

export const getUserId = gql`
    query user {
        user @client {
            _id
        }
    }
`;

const CreateEventPageContainer = graphql(getUserId, {
  props: ({ data }) => ({ user: data.user }),
})(CreateEventPage);

export default withStyles(styles)(CreateEventPageContainer);
