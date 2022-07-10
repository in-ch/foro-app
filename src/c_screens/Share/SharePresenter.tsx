import React from 'react';
import styled from 'styled-components/native';
import {Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';
import RadioGroup from '@components/RadioButton';

const ShareButtonContainer = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[110]}px;
  background-color: #fff;
  padding: ${nomalizes[5]}px;
  padding-top: ${nomalizes[10]}px;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const ButtonWrapper = styled.View`
  width: ${nomalizes[45]}px;
  height: ${nomalizes[70]}px;
  display: flex;
  flex-direction: column;
  margin-right: ${nomalizes[10]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #000;
  margin-top: ${nomalizes[5]}px;
  font-size: ${nomalizes[10]}px;
`;
const DesText = styled.Text`
  color: #757575;
  margin-left: ${nomalizes[5]}px;
  margin-top: ${nomalizes[5]}px;
  font-size: ${nomalizes[10]}px;
`;
const NeigorContainer = styled.View`
  margin-top: ${nomalizes[15]}px;
  width: ${cWidth}px;
  height: ${cHeight - nomalizes[110]}px;
  background-color: #fff;
`;
const NeigorContainerHeader = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[50]}px;
  padding-top: ${nomalizes[8]}px;
`;
const SelectWrapper = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[50]}px;
  padding-left: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
`;
const SelectWapperButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const SelectTextView = styled.View`
  flex: 9;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const SelectTextViewText = styled.Text`
  color: #000;
  margin-left: ${nomalizes[15]}px;
  font-size: ${nomalizes[12]}px;
`;
const Hr = styled.View`
  width: ${cWidth}px;
  height: 1px;
  background-color: #dbdbdb;
`;
const Submit = styled.TouchableOpacity`
  width: ${cWidth * 0.9}px;
  height: ${nomalizes[35]}px;
  border-radius: ${nomalizes[7]}px;
  display: flex;
  background-color: #ff6c63;
  position: absolute;
  bottom: ${nomalizes[50]}px;
  left: ${cWidth * 0.05}px;
  ${cssUtil.doubleCenter};
`;
const SubmitText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[12]}px;
`;
interface Props {
  GoBack: () => void;
}

const SharePresenter = ({GoBack}: Props) => {
  return (
    <>
      <Header text="공유" back={GoBack} />
      <ShareButtonContainer>
        <ButtonContainer>
          <ButtonWrapper>
            <Image
              style={{
                width: nomalizes[35],
                height: nomalizes[35],
              }}
              source={images.kakaoShare}
            />
            <ButtonText>카카오톡</ButtonText>
          </ButtonWrapper>
          <ButtonWrapper>
            <Image
              style={{
                width: nomalizes[35],
                height: nomalizes[35],
              }}
              source={images.pinkShare}
            />
            <ButtonText>전체나눔</ButtonText>
          </ButtonWrapper>
        </ButtonContainer>

        <DesText>
          *전체 나눔 선택 시, 이웃 모두에게 ‘나눔합니다’ 알림을 보냅니다.
        </DesText>
      </ShareButtonContainer>
      <NeigorContainer>
        <NeigorContainerHeader>
          <SelectWrapper>
            <SelectWapperButtonWrapper />
            <SelectTextView>
              <Text>0개 선택됨</Text>
            </SelectTextView>
          </SelectWrapper>
        </NeigorContainerHeader>
        <Hr />
        <ScrollView>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activeButton="asdf"
                onChange={() => console.log('')}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activeButton="asdf"
                onChange={() => console.log('')}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
          <SelectWrapper>
            <SelectWapperButtonWrapper>
              <RadioGroup
                options={['']}
                activeButton="asdf"
                onChange={() => console.log('')}
              />
            </SelectWapperButtonWrapper>
            <SelectTextView>
              <Image
                style={{
                  width: nomalizes[30],
                  height: nomalizes[30],
                }}
                source={images.user}
              />
              <SelectTextViewText>유저 닉네임</SelectTextViewText>
            </SelectTextView>
          </SelectWrapper>
        </ScrollView>
      </NeigorContainer>
      <Submit>
        <SubmitText>완료</SubmitText>
      </Submit>
    </>
  );
};

export default SharePresenter;
