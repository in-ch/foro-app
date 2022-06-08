import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootTabParamList} from '../../../../navigation/RootNavigation';

import InputProfileContainer from './InputProfileContainer';

export interface InputProfileProp {
  navigation: NavigationProp<RootTabParamList, 'InputProfile'>;
  route: RouteProp<RootTabParamList, 'InputProfile'>;
}

const InputProfile = ({navigation, route}: InputProfileProp) => {
  return (
    <>
      <InputProfileContainer navigation={navigation} route={route} />
    </>
  );
};

export default InputProfile;
