/* eslint-disable no-shadow */
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {AgendaProps} from './FriendAgenda';
import {LOAD_USER} from '@services/queries/user';
import {LOAD_FOOD} from '@services/queries/food';
import {REQUEST_FOOD} from '@services/mutations/alarm';
import {groupBy, sortByGroup} from '@utills/groupBy';
import {thisWeek} from '@utills/thisWeek';
import FriendAgendaPresenter from './FriendAgendaPresenter';
import {tokenUserNo} from '~/apollo/client';
import {SEND_PUSH} from '~/c_services/mutations/push';

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

  const [mutationRequestFood] = useMutation(REQUEST_FOOD, {
    onCompleted: d => {
      console.log(JSON.stringify(d));
    },
  });
  const [mutationSendPush] = useMutation(SEND_PUSH);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNo, setSelectedNo] = useState<number>(0);
  const toastRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const [friendNo, setFriendNo] = useState<number>(0);
  const userNo = useReactiveVar(tokenUserNo);
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  const selectedShow = async (id: number, friendNo: number) => {
    await setSelectedNo(id);
    await setFriendNo(friendNo);
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

  const handleRequestFood = () => {
    mutationRequestFood({
      variables: {
        userNo: userNo,
        friendNo: friendNo,
        foodNo: selectedNo,
      },
      onCompleted: () => {
        mutationSendPush({
          variables: {
            userNo: friendNo,
            title: '새로운 공유 요청이 왔어요!',
            body: '바로 확인해보세요.',
            type: 2,
          },
        });
      },
    });
  };

  const handleEvent = () => {
    showToast('공유를 요청하였습니다.');
    handleRequestFood();
    setSelectModal(false);
    setShowModal(false);

    //vvv
  };

  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  return (
    <FriendAgendaPresenter
      GoBack={GoBack}
      goToDetail={goToDetail}
      selectedShow={(value: number, value2: number) =>
        selectedShow(value, value2)
      }
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
