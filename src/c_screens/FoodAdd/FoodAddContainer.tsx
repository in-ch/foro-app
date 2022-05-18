import React, {useState} from 'react';
import {FoodAddProps} from './FoodAdd';
import FoodAddPresenter from './FoodAddPresenter';

const FoodAddContainer = ({navigation}: FoodAddProps) => {
  const [text, setText] = useState<string>('');
  const GoBack = () => {
    navigation.goBack();
  };
  const GoToFoodSearchResult = () => {
    navigation.navigate('FoodSearchResult', {text});
  };
  const handleSearch = () => {
    if (text !== '') {
      GoToFoodSearchResult();
    }
  };
  return (
    <FoodAddPresenter
      GoBack={GoBack}
      handleSearch={handleSearch}
      value={text}
      setValue={(value: string) => setText(value)}
    />
  );
};

export default FoodAddContainer;
