import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './client';
import UserPage from './Pages/UserPage/UserPage';

export default () => <ApolloProvider client={client}>
  <UserPage />
</ApolloProvider>
