import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import {SizedBox} from '@components/SizedBox';
import {nomalizes, statusBarHeight} from '@utills/constants';
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
`;
const InputContainer = styled.View`
  flex: 8;
`;
const ButtonContainer = styled.View`
  flex: 2;
`;
const Button = styled.TouchableOpacity`
  width: 90%;
  height: ${nomalizes[40]}px;
  background-color: #a0a0a0;
  left: 5%;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const TText = styled.Text`
  font-size: ${nomalizes[14]}px;
`;

const InputProfilePresenter = ({GoBack, GoToHome}: Props) => {
  const [nickname, setNickname] = useState<string>('');

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={statusBarHeight}>
      <Header text="닉네임 생성" back={GoBack} />
      <SizedBox.Custom margin={nomalizes[50]} />
      <InputContainer>
        <TextInput
          value={nickname}
          setValue={(value: string) => setNickname(value)}
          maxLength={10}
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
