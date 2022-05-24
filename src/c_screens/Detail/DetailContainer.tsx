import {useMutation, useQuery} from '@apollo/client';
import React, {useState} from 'react';

import {DELETE_FOOD, UPDATE_FOOD} from '@services/mutations/food';
import {LOAD_FOOD_DATA} from '@services/queries/food';
import {DetailProps} from './Detail';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({navigation, route}: DetailProps) => {
  const [cacheConsumed, setCacheConsumed] = useState<boolean>(false);
  const [cacheOnlyMe, setCacheOnlyMe] = useState<boolean>(false);
  const [consumed, setConsumed] = useState<boolean>(false);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const [me, setMe] = useState<number>(0);
  const goToBack = () => {
    navigation.goBack();
  };
  const handleUpdate = () => {
    if (cacheConsumed === consumed && cacheOnlyMe === onlyMe) {
    } else {
      // 여기서 뮤테이션 실행
      mutationUpdateFood({
        variables: {
          food: {
            no: me,
            onlyMe: onlyMe,
            consumed: consumed,
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
      setConsumed(d?.loadFoodData?.consumed);
      setOnlyMe(d?.loadFoodData?.onlyMe);
      setCacheConsumed(d?.loadFoodData?.consumed);
      setCacheOnlyMe(d?.loadFoodData?.onlyMe);
    },
  });

  const [mutationUpdateFood] = useMutation(UPDATE_FOOD);
  const [mutationDeleteFood] = useMutation(DELETE_FOOD);

  return (
    <DetailPresenter
      goToBack={goToBack}
      data={data?.loadFoodData}
      consumed={consumed}
      setConsumed={setConsumed}
      setOnlyMe={setOnlyMe}
      onlyMe={onlyMe}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  );
};

export default DetailContainer;
