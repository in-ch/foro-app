/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {FoodAddProps} from './FoodAdd';
import FoodAddPresenter from './FoodAddPresenter';
import {getListFilter} from '@utills/getListFilter';
import {foods} from '~/data/FOOD';

const FoodAddContainer = ({navigation}: FoodAddProps) => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState([]);
  const GoBack = () => {
    navigation.goBack();
  };
  const GoToFoodSearchResult = () => {
    navigation.navigate('FoodSearchResult', {text: text.trim()});
  };
  const handleSearch = () => {
    if (text !== '') {
      GoToFoodSearchResult();
    }
  };
  const handleKeywordClick = (value: string) => {
    navigation.navigate('FoodSearchResult', {text: value.trim()});
  };
  const handleChangeText = async (text: string) => {
    setText(text);
    await setResults(getListFilter(foods, text));
  };
  return (
    <FoodAddPresenter
      GoBack={GoBack}
      handleSearch={handleSearch}
      value={text}
      handleChangeText={handleChangeText}
      handleKeywordClick={handleKeywordClick}
      results={results}
    />
  );
};

export default FoodAddContainer;
