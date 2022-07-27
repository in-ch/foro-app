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
  const goToFriendDetail = (no: number) => {
    navigation.navigate('DetailFriend', {no});
  };

  return (
    <SearchPresenter
      GoBack={GoBack}
      goToDetail={goToDetail}
      goToFriendDetail={goToFriendDetail}
    />
  );
};

export default SearchContainer;
