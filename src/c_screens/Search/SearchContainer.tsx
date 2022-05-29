import React from 'react';
import {SearchProps} from './Search';
import SearchPresenter from './SearchPresenter';

const SearchContainer = ({navigation}: SearchProps) => {
  const GoBack = () => {
    navigation.goBack();
  };
  const goToDetail = (no: number) => {
    navigation.navigate('Detail', {no});
  };

  return <SearchPresenter GoBack={GoBack} goToDetail={goToDetail} />;
};

export default SearchContainer;
