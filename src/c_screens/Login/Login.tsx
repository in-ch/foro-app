import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootTabParamList} from '../../navigation/RootNavigation';
import LoginContainer from './LoginContainer';

export interface HomeProps {
  navigation: NavigationProp<RootTabParamList, 'Home'>;
  route: RouteProp<RootTabParamList, 'Home'>;
}

const Login = ({navigation}: HomeProps) => {
  return (
    <>
      <LoginContainer navigation={navigation} />
    </>
  );
};

export default Login;
