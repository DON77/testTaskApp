import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addSecretMutation, removeSecretMutation } from '../mutations/secret';
import { usersQuery } from '../queries/user';

const withGraphql = compose(
  graphql(usersQuery, {
    options: ({ token = 'myToken' }) => ({
      variables: { token },
    })
  }),
  graphql(addSecretMutation, {
    props: ({ mutate }) => ({
      addSecret: newSecretData => mutate({
        variables: newSecretData,
        refetchQueries: [{ query: usersQuery, variables: { token: 'myToken' } }],
      }),
    }),
  }),
  graphql(removeSecretMutation, {
    props: ({ mutate }) => ({
      removeSecret: removedSecretData => mutate({
        variables: removedSecretData,
        refetchQueries: [{ query: usersQuery, variables: { token: 'myToken' } }],
      }),
    }),
  }),
);

export default withGraphql;
