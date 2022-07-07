import {useQuery} from '@apollo/client';
import React from 'react';

import {LOAD_USER} from '@services/queries/user';
import {AgendaProps} from './AgendaNew';
import AgendaNewPresenter from './AgendaNewPresenter';

const AgendaNewContainer = ({navigation, route}: AgendaProps) => {
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
    <AgendaNewPresenter
      GoBack={GoBack}
      selected={route?.params?.selected}
      goToDetail={goToDetail}
      GoToFoodAdd={GoToFoodAdd}
      nickname={data?.loadUser?.nickname}
    />
  );
};

export default AgendaNewContainer;
