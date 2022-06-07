import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import TextInput from '@components/TextInput';
import {cssUtil} from '@utills/cssUtil';

interface Props {
  GoBack: () => void;
  GoToHome: () => void;
}

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
const InputProfilePresenter = ({GoToHome}: Props) => {
  const [nickname, setNickname] = useState<string>('');

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SizedBox.Custom margin={nomalizes[30]} />
      <TextContainer>
        <Heading>반갑습니다!</Heading>
        <SizedBox.Custom margin={nomalizes[10]} />
        <SubText>Fooro에서 사용하실 닉네임과 프로필 사진을</SubText>
        <SubText>설정해주세요</SubText>
      </TextContainer>
      <InputContainer>
        <TextInput
          value={nickname}
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
