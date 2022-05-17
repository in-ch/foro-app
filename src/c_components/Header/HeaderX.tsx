/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {cWidth, nomalizes, statusBarHeight} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import {cssUtil} from '@utills/cssUtil';
import Images from '@assets/images';

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
const TextContainer = styled.View<TextContainerProps>`
  width: ${props =>
    props.button ? cWidth - nomalizes[60] : cWidth - nomalizes[30]};
`;
const TText = styled.Text<TextContainerProps>`
  position: relative;
  left: ${props => (props.button ? nomalizes[27] : -nomalizes[15])};
  font-size: ${nomalizes[14]}px;
  font-weight: bold;
  color: #000;
`;
const Button = styled.TouchableOpacity`
  width: ${nomalizes[45]}px;
  height: ${nomalizes[25]}px;
  margin-right: ${nomalizes[10]}px;
  border-radius: ${nomalizes[7]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
interface TextContainerProps {
  button?: boolean;
}
interface HeaderProps {
  text: string;
  button?: () => void;
}

const HeaderX = ({text, button}: HeaderProps) => {
  return (
    <Container>
      <SizedBox.Custom margin={statusBarHeight} />
      <Wrapper
        style={{
          borderBottomColor: '#e2e2e2',
          borderBottomWidth: 1,
        }}>
        <TextContainer button={button ? true : false}>
          <TText button={button ? true : false} style={{textAlign: 'center'}}>
            {text}
          </TText>
        </TextContainer>
        <Button onPress={button}>
          <Image
            style={{
              width: nomalizes[15],
              height: nomalizes[15],
            }}
            source={Images.close}
          />
        </Button>
      </Wrapper>
    </Container>
  );
};

export default HeaderX;
