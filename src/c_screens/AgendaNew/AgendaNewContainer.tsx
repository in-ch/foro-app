import {useQuery} from '@apollo/client';
import React, {useState} from 'react';

import {LOAD_USER} from '@services/queries/user';
import {AgendaProps} from './AgendaNew';
import AgendaNewPresenter from './AgendaNewPresenter';
import {LOAD_FOOD} from '@services/queries/food';
import {groupBy, sortByGroup} from '@utills/groupBy';
import {thisWeek} from '@utills/thisWeek';

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

  const {
    data: food,
    refetch,
    loading,
  } = useQuery(LOAD_FOOD, {
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
    if (id === 1) {
      setSelectModal(false);
    }
  };
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const [selectModalText, setSelectModalText] = useState<string>('');
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const shareFood = () => {
    setSelectModal(true);
    setSelectModalText('해당 식품을 공유하시겠습니까?');
  };
  const consumeFood = () => {
    setSelectModal(true);
    setSelectModalText('해당 식품을 소비 완료하시겠습니까?');
  };
  const publicFood = () => {
    setSelectModalText('해당 식품을 공개하시겠습니까?');
    setSelectModal(true);
  };
  const updateFood = () => {
    navigation.navigate('Detail', {no: selectedNo});
    setShowModal(!showModal);
  };
  const deleteFood = () => {
    setSelectModalText('해당 식품을 삭제하시겠습니까?');
    setSelectModal(true);
  };
  const handleEvent = () => {
    if (selectModalText === '해당 식품을 공유하시겠습니까?') {
    } else if (selectModalText === '해당 식품을 소비 완료하시겠습니까?') {
    } else if (selectModalText === '해당 식품을 공개하시겠습니까?') {
    } else if (selectModalText === '해당 식품을 삭제하시겠습니까?') {
    } else {
      return;
    }
  };
  return (
    <AgendaNewPresenter
      GoBack={GoBack}
      goToDetail={goToDetail}
      GoToFoodAdd={GoToFoodAdd}
      selectedShow={(value: number) => selectedShow(value)}
      showModal={showModal}
      nickname={data?.loadUser?.nickname}
      foodData={sortByGroup(
        groupBy(food?.loadFood, 'dday'),
        route?.params?.selected,
      )}
      thisWeek={thisWeek()}
      weekData={week}
      thisDay={String(new Date().getDay())}
      loading={loading}
      shareFood={shareFood}
      consumeFood={consumeFood}
      publicFood={publicFood}
      updateFood={updateFood}
      deleteFood={deleteFood}
      cancelSelectModal={cancelSelectModal}
      selectModal={selectModal}
      selectModalText={selectModalText}
      handleEvent={handleEvent}
    />
  );
};

export default AgendaNewContainer;
