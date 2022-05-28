/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';

const Container = styled.View`
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[100]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const Loading = () => {
  return (
    <Container>
      <Image
        style={{
          width: nomalizes[20],
          height: nomalizes[20],
          marginBottom: '100',
        }}
        source={images.loading}
      />
    </Container>
  );
};

export default Loading;
