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

const createEvent = gql`
    mutation createEvent(
        $name: String!, 
        $description: String!,
        $start: String!,
        $end: String!, 
        $creatorId: ID! 
        $contribution: Int!,
        $image: Upload!
    ) {
        createEvent(
            name: $name,
            description: $description,
            start: $start, 
            end: $end,
            creatorId: $creatorId, 
            contribution: $contribution,
            image: $image
        ) 
        {
            name
            _id
            start
            description
            __typename
        }
    }
`;

const CreateEventPageContainer = compose(
  graphql(getUserId, { props: ({ data }) => ({ user: data.user }) }),
  graphql(createEvent),
)(CreateEventPage);

export default withStyles(styles)(CreateEventPageContainer);
