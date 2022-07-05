import React from 'react';
import {AgendaProps} from './newAgenda';
import NewAgendaPresneter from './newAgendaPresenter';

const NewAgendaContainer = ({navigation, route}: AgendaProps) => {
  console.log(route.params.userId);
  const GoBack = () => {
    navigation.goBack();
  };

  return <NewAgendaPresneter GoBack={GoBack} />;
};

export default NewAgendaContainer;
