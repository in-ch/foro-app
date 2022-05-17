import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootTabParamList} from '../../../../navigation/RootNavigation';

import InputProfileContainer from './InputProfileContainer';

export interface InputProfileProp {
  navigation: NavigationProp<RootTabParamList, 'InputProfile'>;
}

const InputProfile = ({navigation}: InputProfileProp) => {
  return (
    <>
      <InputProfileContainer navigation={navigation} />
    </>
  );
};

export default InputProfile;
