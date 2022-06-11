import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '@navigation/RootNavigation';
import NeighborContainer from './ NeighborContainer';

export interface NeighborProp {
  navigation: NavigationProp<RootTabParamList, 'Neighbor'>;
}

const Neighbor = ({navigation}: NeighborProp) => {
  return <NeighborContainer navigation={navigation} />;
};

export default Neighbor;
