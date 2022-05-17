import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import DetailContainer from './DetailContainer';

export interface DetailProps {
  navigation: NavigationProp<RootTabParamList, 'Detail'>;
}

const Detail = ({navigation}: DetailProps) => {
  return <DetailContainer navigation={navigation} />;
};

export default Detail;
