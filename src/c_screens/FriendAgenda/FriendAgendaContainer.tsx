import {useQuery} from '@apollo/client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {AgendaProps} from './FriendAgenda';
import {LOAD_USER} from '@services/queries/user';
import {LOAD_FOOD} from '@services/queries/food';
import {groupBy, sortByGroup} from '@utills/groupBy';
import {thisWeek} from '@utills/thisWeek';
import FriendAgendaPresenter from './FriendAgendaPresenter';

const FriendAgendaContainer = ({navigation, route}: AgendaProps) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const goToDetail = (no: number) => {
    navigation.navigate('DetailFriend', {no});
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
      userNo: route?.params?.userId,
    },
    fetchPolicy: 'network-only',
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNo, setSelectedNo] = useState<number>(0);
  const toastRef = useRef<any>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  const selectedShow = async (id: number) => {
    await setSelectedNo(id);
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
    setSelectModalText('해당 식품을 공유 요청하겠습니까?');
  };

  const handleEvent = () => {
    showToast('공유를 요청하였습니다.');
    setSelectModal(false);
    setShowModal(false);
  };

  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  return (
    <FriendAgendaPresenter
      GoBack={GoBack}
      goToDetail={goToDetail}
      selectedShow={(value: number) => selectedShow(value)}
      showModal={showModal}
      nickname={data?.loadUser?.nickname}
      foodData={sortByGroup(
        groupBy(food?.loadFood, 'dday'),
        route?.params?.selected,
      )}
      data={food?.loadFood}
      thisWeek={thisWeek()}
      weekData={week}
      thisDay={String(new Date().getDay())}
      loading={loading}
      shareFood={shareFood}
      cancelSelectModal={cancelSelectModal}
      selectModal={selectModal}
      selectModalText={selectModalText}
      handleEvent={handleEvent}
      toastRef={toastRef}
    />
  );
};

export default FriendAgendaContainer;
