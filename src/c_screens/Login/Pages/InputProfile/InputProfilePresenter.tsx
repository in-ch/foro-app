import React from 'react';
import {Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {SizedBox} from '@components/SizedBox';
import TextInput from '@components/TextInput';
import Loading from '@components/Loading';
import {nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';

const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-left: 5%;
  padding-right: 5%;
`;
const TextContainer = styled.View`
  flex: 2;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const InputContainer = styled.View`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.View`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: ${nomalizes[20]}px;
`;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: ${nomalizes[40]}px;
  background-color: #a0a0a0;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  font-size: ${nomalizes[14]}px;
  font-family: 'Pretendard';
`;
const Heading = styled.Text`
  font-size: ${nomalizes[16]}px;
  font-family: 'Pretendard';
  font-weight: bold;
`;
const SubText = styled.Text`
  font-size: ${nomalizes[12]}px;
  font-family: 'Pretendard';
  font-weight: normal;
  margin-top: ${nomalizes[2]}px;
`;
const IImage = styled.Image`
  width: ${nomalizes[65]}px;
  height: ${nomalizes[65]}px;
`;

interface Props {
  GoBack: () => void;
  GoToHome: () => void;
  isProfileLoading: boolean;
  showImagePicker: () => void;
  nickname: string | null;
  setNickname: (value: string) => void;
}

const InputProfilePresenter = ({
  GoToHome,
  isProfileLoading,
  showImagePicker,
  nickname,
  setNickname,
}: Props) => {
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isProfileLoading && <Loading />}
      <SizedBox.Custom margin={nomalizes[30]} />
      <TextContainer>
        <Heading>반갑습니다!</Heading>
        <SizedBox.Custom margin={nomalizes[25]} />
        <SubText>Fooro에서 사용하실 닉네임과 프로필 사진을</SubText>
        <SubText>설정해주세요</SubText>
      </TextContainer>
      <InputContainer>
        <TouchableOpacity onPress={showImagePicker}>
          <IImage source={images.uploadAccount} />
        </TouchableOpacity>
        <SizedBox.Custom margin={nomalizes[20]} />
        <TextInput
          value={String(nickname)}
          setValue={(value: string) => setNickname(value)}
          maxLength={10}
          onlyBottom={true}
        />
      </InputContainer>
      <ButtonContainer>
        <Button onPress={() => GoToHome()}>
          <TText>확 인</TText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default InputProfilePresenter;
