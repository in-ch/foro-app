import React from 'react';
import styled from 'styled-components/native';
import {View} from 'react-native';

import {nomalizes} from '@utills/constants';
import Story from './Story';

const Container = styled.View`
  height: ${nomalizes[75]}px;
  background-color: #f5f5f5;
`;
const SScrollView = styled.ScrollView`
  height: ${nomalizes[70]}px;
`;
const Wrapper = styled.View`
  height: ${nomalizes[70]}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: ${nomalizes[9]}px;
  margin-top: ${nomalizes[5]}px;
`;
const Storys = () => {
  return (
    <Container>
      <SScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <Wrapper>
          <Story />
          <Story />
          <Story />
          <Story />
          <Story />
          <Story isPlus={true} />

          <View style={{width: nomalizes[5]}} />
        </Wrapper>
      </SScrollView>
    </Container>
  );
};

export default Storys;
