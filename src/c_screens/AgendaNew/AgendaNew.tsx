import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';

import {RootTabParamList} from '~/navigation/RootNavigation';
import AgendaNewContainer from './AgendaNewContainer';

export interface AgendaProps {
  navigation: NavigationProp<RootTabParamList, 'AgendaNew'>;
  route: RouteProp<RootTabParamList, 'AgendaNew'>;
}

const AgendaNew = ({navigation, route}: AgendaProps) => {
  return <AgendaNewContainer navigation={navigation} route={route} />;
};

export default AgendaNew;
