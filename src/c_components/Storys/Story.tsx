import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';
import FFText from '../FFText';

const Container = styled.View`
  width: ${nomalizes[50]}px;
  height: ${nomalizes[60]}px;
  display: flex;
  flex-direction: column;
  margin-left: ${nomalizes[10]}px;
`;
const Profile = styled.View`
  background-color: #e2e2e2;
  border-radius: ${nomalizes[25]}px;
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const NameContainer = styled.View`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[15]}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: ${nomalizes[5]}px;
`;

interface Props {
  isPlus?: boolean;
}
const Story = ({isPlus}: Props) => {
  return (
    <Container>
      <Profile>
        {isPlus ? (
          <Image
            style={{
              width: nomalizes[8],
              height: nomalizes[8],
            }}
            source={images.plus}
          />
        ) : (
          <Image
            style={{
              width: nomalizes[40],
              height: nomalizes[40],
            }}
            source={images.account}
          />
        )}
      </Profile>
      <NameContainer>
        <FFText>아무 이름</FFText>
      </NameContainer>
    </Container>
  );
};

export default Story;
