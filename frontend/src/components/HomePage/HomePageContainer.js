import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import HomePage from './HomePage';

const styles = {};

const onGeAllEvents = gql`
    query allEvents {
        allEvents {
            name
            description
            start
            end
            contribution
            creatorId
            _id
            agreedUsers
            rejectedUsers
            maybeUsers
            image {
                path
                filename
            }
        }
    }
`;

const HomePageContainer = compose(
  graphql(onGeAllEvents, {
    props: ({ data: { allEvents, error, loading } }) => ({ events: allEvents, error, loading }),
  }),
)(HomePage);

export default withStyles(styles)(HomePageContainer);
