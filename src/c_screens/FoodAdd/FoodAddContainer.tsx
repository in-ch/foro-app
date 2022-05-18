import React, {useState} from 'react';
import {FoodAddProps} from './FoodAdd';
import FoodAddPresenter from './FoodAddPresenter';

import {foods} from '../../data/FOOD';
import {getListFilter} from '~/utills/getListFilter';
import {FoodData} from '~/types/Food';

const FoodAddContainer = ({navigation}: FoodAddProps) => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<FoodData | []>([]);
  const GoBack = () => {
    navigation.goBack();
  };
  const GoToFoodSearchResult = () => {
    navigation.navigate('FoodSearchResult', {});
  };
  const handleSearch = () => {
    if (text !== '') {
      setResults(getListFilter(foods, text));
    }
  };
  return (
    <FoodAddPresenter
      GoBack={GoBack}
      GoToFoodSearchResult={GoToFoodSearchResult}
      handleSearch={handleSearch}
      value={text}
      setValue={(value: string) => setText(value)}
      results={results}
    />
  );
};

export default FoodAddContainer;
