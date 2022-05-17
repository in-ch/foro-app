/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {Image} from 'react-native';
import {cWidth, nomalizes, statusBarHeight} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';
import {cssUtil} from '@utills/cssUtil';
import Images from '@assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
`;
interface TextContainerProps {
  button?: boolean;
}
interface HeaderProps {
  text: string;
  back: () => void;
  button?: () => void;
  plus?: boolean;
}

const HeaderPlus = ({text, back, button}: HeaderProps) => {
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
            <Image
              style={{
                width: nomalizes[20],
                height: nomalizes[20],
                marginRight: nomalizes[10],
              }}
              source={Images.bigPlus}
            />
          </TouchableOpacity>
        )}
      </Wrapper>
    </Container>
  );
};

export default HeaderPlus;
