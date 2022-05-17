import React from 'react';
import {DetailProps} from './Detail';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({navigation}: DetailProps) => {
  const goToBack = () => {
    navigation.goBack();
  };
  return <DetailPresenter goToBack={goToBack} />;
};

export default DetailContainer;
