/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import styled from 'styled-components/native';

import {cWidth, nomalizes, statusBarHeight} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {SizedBox} from '@components/SizedBox';
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
const IconContatiner = styled.TouchableOpacity`
  width: ${nomalizes[30]}px;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter}
`;
const TextContainer = styled.View<TextContainerProps>`
  width: ${props =>
    props.button ? cWidth - nomalizes[80] : cWidth - nomalizes[30]};
`;
const TText = styled.Text<TextContainerProps>`
  position: relative;
  left: ${props => (props.button ? nomalizes[15] : -nomalizes[15])};
  font-size: ${nomalizes[14]}px;
  font-weight: bold;
  color: #000;
  font-family: 'Pretendard';
`;

const StyledButton = styled.View`
  width: ${nomalizes[40]}px;
  height: ${nomalizes[25]}px;
  border-radius: ${nomalizes[5]}px;
  background-color: #ff6c63;
  margin-right: ${nomalizes[5]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const StyledButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[10]}px;
  font-family: 'Pretendard';
`;
interface TextContainerProps {
  button?: boolean;
}
interface HeaderProps {
  text: string;
  back: () => void;
  button?: () => void;
  plus?: boolean;
  buttonStyle?: boolean;
  buttonStyleText?: string;
}

const HeaderPlus = ({
  text,
  back,
  button,
  buttonStyle,
  buttonStyleText,
}: HeaderProps) => {
  return (
    <Container>
      <SizedBox.Custom margin={statusBarHeight} />
      <Wrapper
        style={{
          borderBottomColor: '#e2e2e2',
          borderBottomWidth: 1,
        }}>
        <IconContatiner onPress={back}>
          <Image
            style={{width: nomalizes[20], height: nomalizes[20]}}
            source={Images.back}
          />
        </IconContatiner>
        <TextContainer button={button ? true : false}>
          <TText button={button ? true : false} style={{textAlign: 'center'}}>
            {text}
          </TText>
        </TextContainer>
        {button && (
          <TouchableOpacity
            onPress={button}
            style={{
              width: nomalizes[55],
              height: nomalizes[30],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {buttonStyle ? (
              <StyledButton>
                <StyledButtonText>{buttonStyleText}</StyledButtonText>
              </StyledButton>
            ) : (
              <Image
                style={{
                  width: nomalizes[20],
                  height: nomalizes[20],
                  marginRight: nomalizes[10],
                }}
                source={Images.bigPlus}
              />
            )}
          </TouchableOpacity>
        )}
      </Wrapper>
    </Container>
  );
};

export default HeaderPlus;
