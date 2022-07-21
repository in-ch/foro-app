import {NavigationProp} from '@react-navigation/native';
import React from 'react';

import {RootTabParamList} from '~/navigation/RootNavigation';
import FriendAddContainer from './FriendAddContainer';

export interface FriendAddProps {
  navigation: NavigationProp<RootTabParamList, 'FriendAdd'>;
}

const FriendAdd = ({navigation}: FriendAddProps) => {
  return <FriendAddContainer navigation={navigation} />;
};

export default FriendAdd;
