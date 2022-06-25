import React, {useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import RNRestart from 'react-native-restart';

import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';
import testPush from '~/hooks/Notification';

const linking = {
  prefixes: ['kakao8e1ff68c09e6b4bb069c110e76d314df://'],
  config: {
    screens: {
      UserAdd: 'kakaolink',
    },
  },
};

const App = () => {
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      RNRestart.Restart();
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    testPush();
  }, []);
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
