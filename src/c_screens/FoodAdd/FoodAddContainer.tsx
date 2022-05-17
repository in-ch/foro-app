import React from 'react';
import {FoodAddProps} from './FoodAdd';
import FoodAddPresenter from './FoodAddPresenter';

const FoodAddContainer = ({navigation}: FoodAddProps) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const GoToFoodSearchResult = () => {
    navigation.navigate('FoodSearchResult', {});
  };
  return (
    <FoodAddPresenter
      GoBack={GoBack}
      GoToFoodSearchResult={GoToFoodSearchResult}
    />
  );
};

export default FoodAddContainer;
