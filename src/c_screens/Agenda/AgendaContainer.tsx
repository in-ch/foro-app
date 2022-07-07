import React from 'react';
import AgendaPresenter from './AgendaPresenter';
import {AgendaProps} from './Agenda';
import {useQuery} from '@apollo/client';
import {LOAD_USER} from '~/c_services/queries/user';

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

  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo: route?.params?.userId,
    },
    onCompleted: d => {
      console.log(d);
    },
  });

  return (
    <>
      <AgendaPresenter
        GoBack={GoBack}
        selected={route?.params?.selected}
        goToDetail={goToDetail}
        GoToFoodAdd={GoToFoodAdd}
        nickname={data?.loadUser?.nickname}
      />
    </>
  );
};

export default AgendaContainer;
