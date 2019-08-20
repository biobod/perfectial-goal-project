import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { withStyles } from '@material-ui/styles';
import HomePage from './HomePage';

const styles = {};

const onGeAllFutureEvents = gql`
    query allFutureEvents {
        allFutureEvents {
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
  graphql(onGeAllFutureEvents, {
    props: ({ data: { allFutureEvents, error, loading } }) => ({ events: allFutureEvents, error, loading }),
  }),
)(HomePage);

export default withStyles(styles)(HomePageContainer);
