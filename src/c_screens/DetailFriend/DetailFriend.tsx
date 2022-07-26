import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import DetailFriendContainer from './DetailFriendContainer';

export interface DetailProps {
  navigation: NavigationProp<RootTabParamList, 'DetailFriend'>;
  route: RouteProp<RootTabParamList, 'DetailFriend'>;
}

const DetailFriend = ({navigation, route}: DetailProps) => {
  return <DetailFriendContainer navigation={navigation} route={route} />;
};

export default DetailFriend;
