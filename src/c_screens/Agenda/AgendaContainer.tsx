import React from 'react';
import AgendaPresenter from './AgendaPresenter';
import {AgendaProps} from './Agenda';

const AgendaContainer = ({navigation, route}: AgendaProps) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const goToDetail = (no: number) => {
    navigation.navigate('Detail', {no});
  };
  const GoToFoodAdd = () => {
    navigation.navigate('FoodAdd', {});
  };
  return (
    <>
      <AgendaPresenter
        GoBack={GoBack}
        selected={route?.params?.selected}
        goToDetail={goToDetail}
        GoToFoodAdd={GoToFoodAdd}
      />
    </>
  );
};

export default AgendaContainer;
