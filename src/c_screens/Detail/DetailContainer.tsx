import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {LOAD_FOOD_DATA} from '~/c_services/queries/food';
import {DetailProps} from './Detail';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({navigation, route}: DetailProps) => {
  const [cacheConsumed, setCacheConsumed] = useState<boolean>(false);
  const [cacheOnlyMe, setCacheOnlyMe] = useState<boolean>(false);
  const [consumed, setConsumed] = useState<boolean>(false);
  const [onlyMe, setOnlyMe] = useState<boolean>(false);
  const goToBack = () => {
    navigation.goBack();
  };
  const handleUpdate = () => {
    if (cacheConsumed === consumed && cacheOnlyMe === onlyMe) {
    } else {
      // 여기서 뮤테이션 실행
    }
  };

  const {data} = useQuery(LOAD_FOOD_DATA, {
    variables: {
      foodNo: route?.params.no,
    },
    onCompleted: d => {
      setConsumed(d?.loadFoodData?.consumed);
      setOnlyMe(d?.loadFoodData?.onlyMe);
      setCacheConsumed(d?.loadFoodData?.consumed);
      setCacheOnlyMe(d?.loadFoodData?.onlyMe);
    },
  });
  return (
    <DetailPresenter
      goToBack={goToBack}
      data={data?.loadFoodData}
      consumed={consumed}
      setConsumed={setConsumed}
      setOnlyMe={setOnlyMe}
      onlyMe={onlyMe}
    />
  );
};

export default DetailContainer;
