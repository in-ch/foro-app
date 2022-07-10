import React from 'react';
import {ShareProps} from './Share';
import SharePresenter from './SharePresenter';

const ShareContainer = ({navigation, route}: ShareProps) => {
  console.log(route.params.foodNo);
  const GoBack = () => {
    navigation.goBack();
  };
  return <SharePresenter GoBack={GoBack} />;
};

export default ShareContainer;
