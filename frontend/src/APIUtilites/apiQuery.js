import { gql } from 'apollo-boost';

export const verifyUser = gql`
    query verifyUser($id: String!, $token: String!){
        verifyUser(_id: $id, token: $token) { name email _id }
    }
`;

export const onGetEvent = gql`
    query getEvent($eventId: String!) {
        getEvent(eventId: $eventId) {
            name
            description
            start
            end
            contribution
            _id
            agreedUsers
            rejectedUsers
            creatorId
            maybeUsers
            image {
                path
                filename
            }
        }
    }
`;

export const onAddUserToEvent = gql`
    mutation addUserToEvent($userId:  ID!, $eventId: ID!, $type: String!) {
        addUserToEvent(userId: $userId, eventId: $eventId, type: $type) {
            name
            description
            start
            end
            contribution
            _id
            agreedUsers
            rejectedUsers
            creatorId
            maybeUsers
            image {
                path
                filename
            }
        }
    }
`;