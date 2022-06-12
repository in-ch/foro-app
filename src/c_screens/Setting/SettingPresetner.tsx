import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Switch, TouchableNativeFeedback} from 'react-native';

import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '~/utills/cssUtil';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-top: ${nomalizes[20]}px;
  margin-bottom: ${nomalizes[5]}px;
  color: #272727;
  font-family: 'Pretendard';
`;
const TText = styled.Text`
  font-size: ${nomalizes[12]}px;
  color: #272727;
  font-family: 'Pretendard';
`;
const Row = styled.View`
  width: 86%;
  margin-left: 7%;
  height: ${nomalizes[40]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;

interface Props {
  GoBack: () => void;
  goToTerms: () => void;
  goToPersonalPolicy: () => void;
  handleNeighborShareAbled: () => void;
  handleNeighborShareNewsAbled: () => void;
  neighborShareAbled: boolean;
  neighborShareNewsAbled: boolean;
  loading: boolean;
}

const SettingPresenter = ({
  GoBack,
  goToTerms,
  goToPersonalPolicy,
  handleNeighborShareAbled,
  handleNeighborShareNewsAbled,
  neighborShareAbled,
  neighborShareNewsAbled,
  loading,
}: Props) => {
  return (
    <>
      <Container>
        <Header text="설정" back={GoBack} />
        <Wrapper>
          <Heading>알림</Heading>
          <Row>
            <TText>이웃의 나눔 요청 받기</TText>
            <Switch
              trackColor={{false: '#a8a8a8', true: '#FF6C63'}}
              thumbColor={neighborShareAbled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#a3a3a3"
              value={neighborShareAbled}
              onValueChange={handleNeighborShareAbled}
            />
          </Row>
          <Row>
            <TText>이웃의 식품 공유 소식 받기</TText>
            <Switch
              trackColor={{false: '#a8a8a8', true: '#FF6C63'}}
              thumbColor={neighborShareNewsAbled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#a3a3a3"
              value={neighborShareNewsAbled}
              onValueChange={handleNeighborShareNewsAbled}
            />
          </Row>
          <TouchableNativeFeedback onPress={goToPersonalPolicy}>
            <Heading>개인 정보 처리 방침</Heading>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={goToTerms}>
            <Heading>이용 약관</Heading>
          </TouchableNativeFeedback>
          <Heading>Fooro 탈퇴</Heading>
        </Wrapper>
      </Container>

      {loading && (
        <LoadingContainer>
          <ActivityIndicator animating={true} size="small" color="#000" />
        </LoadingContainer>
      )}
    </>
  );
};

export default SettingPresenter;
