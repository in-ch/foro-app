/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import {cWidth, nomalizes, statusBarHeight} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {SizedBox} from '@components/SizedBox';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Container = styled.View`
  background-color: #fff;
`;
const Wrapper = styled.View`
  width: 100%;
  max-width: 100%;
  height: ${nomalizes[35]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter}
`;
const IconContatiner = styled.View`
  width: ${nomalizes[30]}px;
  height: ${nomalizes[30]}px;
  border: 0px solid #000;

  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter}
`;
const TextContainer = styled.View<TextContainerProps>`
  width: ${props =>
    props.button ? cWidth - nomalizes[80] : cWidth - nomalizes[50]};
`;
const TText = styled.Text<TextContainerProps>`
  position: relative;
  left: ${props => (props.button ? nomalizes[15] : -nomalizes[15])};
  font-size: ${nomalizes[14]}px;
  font-weight: bold;
  color: #000;
  font-family: 'Pretendard';
`;
const Button = styled.TouchableOpacity`
  width: ${nomalizes[45]}px;
  height: ${nomalizes[25]}px;
  margin-right: ${nomalizes[10]}px;
  border-radius: ${nomalizes[7]}px;
  display: flex;
  background-color: #ff6c63;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: white;
  font-family: 'Pretendard';
`;
interface TextContainerProps {
  button?: boolean;
}
interface HeaderProps {
  text: string;
  back: () => void;
  button?: () => void;
}

const Header = ({text, back, button}: HeaderProps) => {
  return (
    <Container>
      <SizedBox.Custom margin={statusBarHeight} />
      <Wrapper
        style={{
          borderBottomColor: '#e2e2e2',
          borderBottomWidth: 1,
        }}>
        <TouchableWithoutFeedback onPress={back}>
          <IconContatiner>
            <Icon name="chevron-left" size={30} color="#3a3a3a" />
          </IconContatiner>
        </TouchableWithoutFeedback>
        <TextContainer button={button ? true : false}>
          <TText button={button ? true : false} style={{textAlign: 'center'}}>
            {text}
          </TText>
        </TextContainer>
        {button && (
          <Button onPress={button}>
            <ButtonText>완료</ButtonText>
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;
