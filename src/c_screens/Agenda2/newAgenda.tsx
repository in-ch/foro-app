import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';

import {RootTabParamList} from '~/navigation/RootNavigation';
import NewAgendaContainer from './newAgendaContainer';

export interface AgendaProps {
  navigation: NavigationProp<RootTabParamList, 'newAgenda'>;
  route: RouteProp<RootTabParamList, 'newAgenda'>;
}

const NewAgenda = ({navigation, route}: AgendaProps) => {
  return <NewAgendaContainer navigation={navigation} route={route} />;
};

export default NewAgenda;
