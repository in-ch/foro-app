import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';

import {DELETE_FOOD, UPDATE_FOOD} from '@services/mutations/food';
import {LOAD_FOOD_DATA} from '@services/queries/food';
import {SEND_PUSH} from '@services/mutations/push';
import {REQUEST_FOOD} from '@services/mutations/alarm';
import {DetailProps} from './DetailFriend';
import DetailFriendPresenter from './DetailFriendPresenter';
import {tokenUserNo} from 'apollo/client';

const DetailFriendContainer = ({navigation, route}: DetailProps) => {
  const [cacheConsumed, setCacheConsumed] = useState<boolean>(false);
  const [cacheOnlyMe, setCacheOnlyMe] = useState<boolean>(false);
  const [cacheMemo, setCacheMemo] = useState<string>('');
  const [consumed, setConsumed] = useState<boolean>(false);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const userNo = useReactiveVar(tokenUserNo);
  const [me, setMe] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');
  const toastRef = useRef<any>(null);
  const goToBack = () => {
    navigation.goBack();
  };
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  const handleUpdate = () => {
    if (
      cacheConsumed === consumed &&
      cacheOnlyMe === onlyMe &&
      cacheMemo === memo
    ) {
      showToast('값이 동일합니다.');
    } else {
      // 여기서 뮤테이션 실행
      mutationUpdateFood({
        variables: {
          food: {
            no: me,
            onlyMe: onlyMe,
            consumed: consumed,
            memo,
          },
        },
      });
    }
  };

  const handleDelete = () => {
    mutationDeleteFood({
      variables: {
        foodNo: me,
      },
    });
  };
  const handleRequest = (foodNo: number, friendNo: number) => {
    showToast('공유 요청이 완료되었습니다.');
    mutationRequestFood({
      variables: {
        userNo: userNo,
        friendNo,
        foodNo,
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

  const {data} = useQuery(LOAD_FOOD_DATA, {
    variables: {
      foodNo: route?.params.no,
    },
    onCompleted: d => {
      setMe(d?.loadFoodData?.no);
      setMemo(d?.loadFoodData?.memo);
      setConsumed(d?.loadFoodData?.consumed);
      setOnlyMe(d?.loadFoodData?.onlyMe);
      setCacheConsumed(d?.loadFoodData?.consumed);
      setCacheOnlyMe(d?.loadFoodData?.onlyMe);
      setCacheMemo(d?.loadFoodData?.memo);
    },
    onError: e => {
      console.log(JSON.stringify(e));
    },
    fetchPolicy: 'network-only',
  });

  const [mutationRequestFood] = useMutation(REQUEST_FOOD, {
    onCompleted: d => {
      console.log(JSON.stringify(d));
    },
  });
  const [mutationSendPush] = useMutation(SEND_PUSH);
  const [mutationUpdateFood] = useMutation(UPDATE_FOOD, {
    onCompleted: () => {
      showToast('수정이 완료되었습니다.');
    },
  });
  const [mutationDeleteFood] = useMutation(DELETE_FOOD);

  return (
    <DetailFriendPresenter
      goToBack={goToBack}
      data={data?.loadFoodData}
      consumed={consumed}
      setConsumed={setConsumed}
      setOnlyMe={setOnlyMe}
      setMemo={(value: string) => setMemo(value)}
      onlyMe={onlyMe}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleRequest={handleRequest}
      memo={memo}
      toastRef={toastRef}
    />
  );
};

export default DetailFriendContainer;
