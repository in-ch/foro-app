import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';

import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';

const linking = {
  prefixes: ['kakao8e1ff68c09e6b4bb069c110e76d314df://'],
  config: {
    screens: {
      UserAdd: 'kakaolink',
    },
  },
};

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer linking={linking}>
          <RootNavigation />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
