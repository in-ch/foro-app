import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';

import {RootTabParamList} from '~/navigation/RootNavigation';
import FriendAgendaContainer from './FriendAgendaContainer';

export interface AgendaProps {
  navigation: NavigationProp<RootTabParamList, 'AgendaNew'>;
  route: RouteProp<RootTabParamList, 'AgendaNew'>;
}

const FriendAgenda = ({navigation, route}: AgendaProps) => {
  return <FriendAgendaContainer navigation={navigation} route={route} />;
};

export default FriendAgenda;
