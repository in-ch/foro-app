import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '@navigation/RootNavigation';
import HomeContainer from './HomeContainer';

export interface HomeProps {
  navigation: NavigationProp<RootTabParamList, 'Home'>;
}

const Home = ({navigation}: HomeProps) => {
  return (
    <>
      <HomeContainer navigation={navigation} />
    </>
  );
};

export default Home;
