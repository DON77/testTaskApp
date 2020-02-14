import { gql } from 'apollo-boost';

export const addSecretMutation = gql`
  mutation ($secretType: String, $secret: String, $userId: ID) {
    addSecret (secretType: $secretType, secret: $secret, userId: $userId) {
      secret
      id
      userId
      secretType
    }
  }
`;

export const removeSecretMutation = gql`
  mutation($secretId: ID) {
    removeSecret (secretId: $secretId) {
      secret
      id
      userId
      secretType
    }
  }
`;
