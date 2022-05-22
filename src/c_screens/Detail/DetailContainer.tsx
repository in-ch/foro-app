import {useQuery} from '@apollo/client';
import React from 'react';
import {LOAD_FOOD_DATA} from '~/c_services/queries/food';
import {DetailProps} from './Detail';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({navigation, route}: DetailProps) => {
  const goToBack = () => {
    navigation.goBack();
  };

  const {data} = useQuery(LOAD_FOOD_DATA, {
    variables: {
      foodNo: route?.params.no,
    },
  });
  return <DetailPresenter goToBack={goToBack} data={data?.loadFoodData} />;
};

export default DetailContainer;
