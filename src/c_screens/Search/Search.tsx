import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {RootTabParamList} from '~/navigation/RootNavigation';
import SearchContainer from './SearchContainer';

export interface SearchProps {
  navigation: NavigationProp<RootTabParamList, 'Search'>;
}

const Search = ({navigation}: SearchProps) => {
  return <SearchContainer navigation={navigation} />;
};

export default Search;
