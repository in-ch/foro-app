import React, {useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {Alert, Dimensions} from 'react-native';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import client from './src/apollo/client';
import RootNavigation from './src/navigation/RootNavigation';
import buildLink from '@utills/dynamicLink';

const linking = {
  prefixes: ['kakao8e1ff68c09e6b4bb069c110e76d314df://app'],
  config: {
    screens: {
      Alarm: {
        path: 'alarm/:id',
        parse: {
          id: (id: any) => `${id}`,
        },
      },
    },
  },
};

const App = () => {
  useEffect(() => {
    buildLink(); // dynamicLink
    // 화면 크기 변할 시 새로고침
    const subscription = Dimensions.addEventListener('change', () => {
      RNRestart.Restart();
    });
    return () => subscription?.remove();
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleDynamicLink = (link: {url: string}) => {
    // dynamic link foreground events
    if (
      link.url.includes('https://foodzeroapp.page.link/u9DC') ||
      link.url.includes('http://www.2hw.co.kr')
    ) {
      console.log(link);
      Alert.alert('foreground events');
      Alert.alert(link.url);
    }
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // dynamic link background/quit events

    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (
          link?.url.includes('https://foodzeroapp.page.link/u9DC') ||
          link?.url.includes('http://www.2hw.co.kr')
        ) {
          console.log(link);

          Alert.alert('background/quit events');
          Alert.alert(link.url);
        }
      });
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
