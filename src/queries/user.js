import { gql } from 'apollo-boost';

export const usersQuery = gql`
  query usersQuery($token: String) {
    user (token: $token) {
      name
      id
      secretId
      secrets {
        id
        userId
        secret 
        secretType
      }
    }
  }
`;
