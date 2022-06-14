import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import UserContainer from './UserAddContainer';

export interface UserAddProps {
  navigation: NavigationProp<RootTabParamList, 'UserAdd'>;
  route: RouteProp<RootTabParamList, 'UserAdd'>;
}

const UserAdd = ({navigation, route}: UserAddProps) => {
  return <UserContainer navigation={navigation} route={route} />;
};

export default UserAdd;
