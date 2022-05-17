import React from 'react';
import {SearchProps} from './Search';
import SearchPresenter from './SearchPresenter';

const SearchContainer = ({navigation}: SearchProps) => {
  const GoBack = () => {
    navigation.goBack();
  };

  return <SearchPresenter GoBack={GoBack} />;
};

export default SearchContainer;
