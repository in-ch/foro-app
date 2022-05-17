import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {RootTabParamList} from '~/navigation/RootNavigation';
import CategoryContainer from './CategoryContainer';

export interface CategoryProps {
  navigation: NavigationProp<RootTabParamList, 'Category'>;
}

const Category = ({navigation}: CategoryProps) => {
  return <CategoryContainer navigation={navigation} />;
};

export default Category;
