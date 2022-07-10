import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import ShareContainer from './ShareContainer';

export interface ShareProps {
  navigation: NavigationProp<RootTabParamList, 'Share'>;
  route: RouteProp<RootTabParamList, 'Share'>;
}

const Share = ({navigation, route}: ShareProps) => {
  return <ShareContainer navigation={navigation} route={route} />;
};

export default Share;
