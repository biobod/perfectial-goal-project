import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import MyEventsPage from './MyEventsPage';

const styles = {}

const getUserId = gql`
    query user {
        user @client {
            _id
        }
    }
`;

const MyEventsPageContainer = compose(
  graphql(getUserId, { props: ({ data }) => ({ user: data.user }) }),
)(MyEventsPage);

export default withStyles(styles)(MyEventsPage);
