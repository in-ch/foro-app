import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '@navigation/RootNavigation';
import SettingContainer from './SettingContainer';

export interface SettingProps {
  navigation: NavigationProp<RootTabParamList, 'Setting'>;
}

const Setting = ({navigation}: SettingProps) => {
  return <SettingContainer navigation={navigation} />;
};

export default Setting;
