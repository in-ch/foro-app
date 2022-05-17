import React from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
