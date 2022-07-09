import {useQuery} from '@apollo/client';
import React, {useState} from 'react';

import {LOAD_USER} from '@services/queries/user';
import {AgendaProps} from './AgendaNew';
import AgendaNewPresenter from './AgendaNewPresenter';
import {LOAD_FOOD} from '@services/queries/food';
import {groupBy, sortByGroup} from '@utills/groupBy';

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
  });

  const {data: food, refetch} = useQuery(LOAD_FOOD, {
    variables: {
      userNo: 1,
    },
    fetchPolicy: 'network-only',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNo, setSelectedNo] = useState<number>(0);
  const selectedShow = (id: number) => {
    setSelectedNo(id);
    setShowModal(!showModal);
  };
  return (
    <AgendaNewPresenter
      GoBack={GoBack}
      selected={route?.params?.selected}
      goToDetail={goToDetail}
      GoToFoodAdd={GoToFoodAdd}
      selectedShow={(value: number) => selectedShow(value)}
      showModal={showModal}
      nickname={data?.loadUser?.nickname}
      foodData={sortByGroup(groupBy(food?.loadFood, 'dday'))}
    />
  );
};

export default AgendaNewContainer;
