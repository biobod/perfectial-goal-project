import { gql } from 'apollo-boost';

export const verifyUser = gql`
    query verifyUser($id: String!, $token: String!){
        verifyUser(_id: $id, token: $token) { name email _id }
    }
`;
