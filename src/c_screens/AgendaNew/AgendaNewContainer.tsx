import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {AgendaProps} from './AgendaNew';
import AgendaNewPresenter from './AgendaNewPresenter';
import {LOAD_USER} from '@services/queries/user';
import {LOAD_FOOD, LOAD_FOOD_DATA} from '@services/queries/food';
import {DELETE_FOOD, UPDATE_FOOD} from '@services/mutations/food';
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
  const GoToShare = () => {
    navigation.navigate('Share', {foodNo: selectedNo});
  };
  const {data} = useQuery(LOAD_USER, {
    variables: {
      userNo: route?.params?.userId,
    },
  });

  const [valueConsumed, setValueConsumed] = useState<boolean>(false); // 모달 소비 완료
  const [valueShare, setValueShare] = useState<boolean>(false); // 모달 공개
  const [loadFoodData, {refetch: foodDataRefetch}] = useLazyQuery(
    LOAD_FOOD_DATA,
    {
      onCompleted: d => {
        setValueConsumed(
          d?.loadFoodData?.consumed !== undefined
            ? d?.loadFoodData?.consumed
            : false,
        );
        setValueShare(
          d?.loadFoodData?.onlyMe !== undefined
            ? d?.loadFoodData?.onlyMe
            : false,
        );
        console.log('비공개 여부' + valueShare);
        console.log('소비 여부' + valueConsumed);
      },
    },
  );
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
  const [mutationUpdateFood] = useMutation(UPDATE_FOOD, {
    onCompleted: () => {
      refetch();
    },
  });
  const [mutationDeleteFood] = useMutation(DELETE_FOOD, {
    onCompleted: () => {
      refetch();
    },
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
    if (!showModal) {
      loadFoodData({
        variables: {
          foodNo: id,
        },
      });
    }
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
    setSelectModalText('해당 식품을 공유하시겠습니까?');
  };
  const consumeFood = () => {
    setSelectModal(true);
    if (valueConsumed) {
      setSelectModalText('해당 식품의 소비를 취소하시겠습니까?');
    } else {
      setSelectModalText('해당 식품을 소비 완료하시겠습니까?');
    }
  };
  const publicFood = () => {
    setSelectModal(true);
    if (valueShare) {
      setSelectModalText('해당 식품을 공개하시겠습니까?');
    } else {
      setSelectModalText('해당 식품을 비공개하시겠습니까?');
    }
  };
  const updateFood = () => {
    navigation.navigate('Detail', {no: selectedNo});
    setShowModal(!showModal);
  };
  const deleteFood = () => {
    setSelectModalText('해당 식품을 삭제하시겠습니까?');
  };

  const handleEvent = () => {
    if (selectModalText === '해당 식품을 공유하시겠습니까?') {
      GoToShare();
    } else if (
      selectModalText === '해당 식품을 소비 완료하시겠습니까?' ||
      selectModalText === '해당 식품의 소비를 취소하시겠습니까?'
    ) {
      mutationUpdateFood({
        variables: {
          food: {
            no: selectedNo,
            consumed: !valueConsumed,
          },
        },
        onCompleted: () => {
          showToast('식품이 수정되었습니다.');
          foodDataRefetch();
        },
      });
    } else if (
      selectModalText === '해당 식품을 공개하시겠습니까?' ||
      selectModalText === '해당 식품을 비공개하시겠습니까?'
    ) {
      mutationUpdateFood({
        variables: {
          food: {
            no: selectedNo,
            onlyMe: !valueShare,
          },
        },
        onCompleted: () => {
          showToast('식품이 수정되었습니다.');
          foodDataRefetch();
        },
      });
    } else if (selectModalText === '해당 식품을 삭제하시겠습니까?') {
      mutationDeleteFood({
        variables: {
          foodNo: selectedNo,
        },
        onCompleted: () => {
          showToast('삭제가 완료되었습니다.');
        },
      });
    } else {
      return;
    }
    setSelectModal(false);
    setShowModal(false);
  };

  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

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
      toastRef={toastRef}
      data={food?.loadFood}
      valueConsumed={valueConsumed}
      valueShare={valueShare}
    />
  );
};

export default AgendaNewContainer;
