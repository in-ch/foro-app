import React from 'react';
import {Image, View} from 'react-native';
import styled from 'styled-components/native';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';
import FFText from '../FFText';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Container = styled.View`
  width: ${nomalizes[50]}px;
  height: ${nomalizes[60]}px;
  display: flex;
  flex-direction: column;
  margin-left: ${nomalizes[9]}px;
  margin-right: ${nomalizes[1]}px;
`;
const Profile = styled.View`
  background-color: #e2e2e2;
  border-radius: ${nomalizes[20]}px;
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
  display: flex;
  overflow: hidden;
  ${cssUtil.doubleCenter};
`;
const NameContainer = styled.View`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[15]}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: ${nomalizes[3]}px;
`;
const IImage = styled.Image`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
`;

interface Props {
  isPlus?: boolean;
  profile?: string;
  nickname?: string;
}
const Story = ({isPlus, profile, nickname}: Props) => {
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
        ) : profile ? (
          <IImage source={{uri: profile}} />
        ) : (
          <SkeletonPlaceholder speed={1800}>
            <View style={{width: nomalizes[40], height: nomalizes[40]}} />
          </SkeletonPlaceholder>
        )}
      </Profile>
      <NameContainer>
        <FFText fontSize={nomalizes[10]}>
          {nickname ? (
            nickname
          ) : (
            <SkeletonPlaceholder speed={1800}>
              <View
                style={{
                  width: nomalizes[40],
                  height: nomalizes[12],
                  marginTop: nomalizes[5],
                }}
              />
            </SkeletonPlaceholder>
          )}
        </FFText>
      </NameContainer>
    </Container>
  );
};

export default Story;
