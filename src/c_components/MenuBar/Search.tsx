import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';

const Container = styled.View`
  margin-bottom: ${nomalizes[2]}px;
  margin-left: ${nomalizes[10]}px;
  margin-right: ${nomalizes[3]}px;
`;
const Search = () => {
  return (
    <Container>
      <Icon name="search" size={20} color="#3a3a3a" />
    </Container>
  );
};

export default Search;
