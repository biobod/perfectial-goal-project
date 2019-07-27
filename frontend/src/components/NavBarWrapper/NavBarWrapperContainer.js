import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import NavBarWrapper from './NavBarWrapper';

export const getUser = gql`
    query user {
        user @client {
            name
            _id
            email
        }
    }
`;

const NavBarContainer = graphql(getUser, {
  props: ({ data }) => ({ user: data.user }),
})(NavBarWrapper);

export default withRouter(NavBarContainer);
