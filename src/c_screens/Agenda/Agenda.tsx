import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '@navigation/RootNavigation';
import AgendaContainer from './AgendaContainer';

export interface AgendaProps {
  navigation: NavigationProp<RootTabParamList, 'Agenda'>;
  route: RouteProp<RootTabParamList, 'Agenda'>;
}

const Agenda = ({navigation, route}: AgendaProps) => {
  return (
    <>
      <AgendaContainer navigation={navigation} route={route} />
    </>
  );
};

export default Agenda;
