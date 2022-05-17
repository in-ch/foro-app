import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import FoodAddContainer from './FoodAddContainer';

export interface FoodAddProps {
  navigation: NavigationProp<RootTabParamList, 'FoodAdd'>;
}

const FoodAdd = ({navigation}: FoodAddProps) => {
  return <FoodAddContainer navigation={navigation} />;
};

export default FoodAdd;
