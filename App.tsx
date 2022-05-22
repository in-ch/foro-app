import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';

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
