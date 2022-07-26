import {useMutation, useQuery} from '@apollo/client';
import React, {useCallback, useRef, useState} from 'react';

import {DELETE_FOOD, UPDATE_FOOD} from '@services/mutations/food';
import {LOAD_FOOD_DATA} from '@services/queries/food';
import {DetailProps} from './DetailFriend';
import DetailFriendPresenter from './DetailFriendPresenter';

const DetailFriendContainer = ({navigation, route}: DetailProps) => {
  const [cacheConsumed, setCacheConsumed] = useState<boolean>(false);
  const [cacheOnlyMe, setCacheOnlyMe] = useState<boolean>(false);
  const [cacheMemo, setCacheMemo] = useState<string>('');
  const [consumed, setConsumed] = useState<boolean>(false);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
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
    fetchPolicy: 'network-only',
  });

  const [mutationUpdateFood] = useMutation(UPDATE_FOOD, {
    onCompleted: () => {
      showToast('수정이 완료되었습니다.');
    },
    // update(cache) {
    //   let dataFoodQuery = cache.readQuery<any>({
    //     query: LOAD_FOOD_DATA,
    //     variables: {
    //       foodNo: route?.params.no,
    //     },
    //   });
    //   cache.writeQuery({
    //     query: LOAD_FOOD_DATA,
    //     variables: {
    //       foodNo: route?.params.no,
    //     },
    //     data: {
    //       loadFoodData: {
    //         __typename: 'Food',
    //         no: dataFoodQuery.loadFoodData.no,
    //         name: dataFoodQuery.loadFoodData.name,
    //         category: dataFoodQuery.loadFoodData.category.name,
    //         categoryColor: dataFoodQuery.loadFoodData.category.color,
    //         keyword: dataFoodQuery.loadFoodData.keyword,
    //         dday: dataFoodQuery.loadFoodData.dday,
    //         updatedAt: dataFoodQuery.loadFoodData.updatedAt,
    //         createdAt: dataFoodQuery.loadFoodData.createdAt,
    //         memo,
    //         onlyMe,
    //         consumed,
    //       },
    //     },
    //   });
    // },
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
      memo={memo}
      toastRef={toastRef}
    />
  );
};

export default DetailFriendContainer;
