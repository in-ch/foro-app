import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import DetailContainer from './DetailContainer';

export interface DetailProps {
  navigation: NavigationProp<RootTabParamList, 'Detail'>;
  route: RouteProp<RootTabParamList, 'Detail'>;
}

const Detail = ({navigation, route}: DetailProps) => {
  return <DetailContainer navigation={navigation} route={route} />;
};

export default Detail;
