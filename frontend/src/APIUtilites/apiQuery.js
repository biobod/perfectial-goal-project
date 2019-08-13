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

export const onGetAuthorName = gql`
    query getUser($userId:  ID!) {
        getUser(userId: $userId) {
            name
        }
    }
`;
export const onAddUserToEvent = gql`
    mutation addUserToEvent($userId:  ID!, $eventId: ID!, $type: String!) {
        addUserToEvent(userId: $userId, eventId: $eventId, type: $type) {
            _id
        }
    }
`;
export const onRemoveUserFromEvent = gql`
    mutation removeUserFromEvent($userId:  ID!, $eventId: ID!, $type: String!) {
        removeUserFromEvent(userId: $userId, eventId: $eventId, type: $type) {
            _id
        }
    }
`;

export const onGeFavoriteEvents = gql`
    query getUserEventsByType($userId: String!, $type: String! ) {
        getUserEventsByType(userId: $userId, type: $type) {
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