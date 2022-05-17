import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import AlarmContainer from './AlarmContainer';

export interface AlarmProps {
  navigation: NavigationProp<RootTabParamList, 'Alarm'>;
}

const Alarm = ({navigation}: AlarmProps) => {
  return <AlarmContainer navigation={navigation} />;
};

export default Alarm;
