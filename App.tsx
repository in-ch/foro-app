import React, {useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import RNRestart from 'react-native-restart';

import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';
import Pushinit from '~/utills/notification';

const linking = {
  prefixes: ['kakao8e1ff68c09e6b4bb069c110e76d314df://'],
  config: {
    screens: {
      UserAdd: 'kakaolink',
    },
  },
};

const App = () => {
  Pushinit(); // 푸쉬 관련 코드

  useEffect(() => {
    // 화면 크기 변할 시 새로고침
    const subscription = Dimensions.addEventListener('change', () => {
      RNRestart.Restart();
    });
    return () => subscription?.remove();
  });

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
