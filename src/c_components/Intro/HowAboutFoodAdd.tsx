import React, {useState} from 'react';
import styled from 'styled-components/native';

import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const LogoutContainer = styled.View`
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  ${cssUtil.doubleCenter};
`;
const LogoutWrapper = styled.View`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[120]}px;
  border-radius: ${nomalizes[20]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${nomalizes[10]}px;
  position: relative;
  top: -${nomalizes[20]}px;
  justify-content: space-between;
`;
const LogoutText = styled.Text`
  color: #333333;
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[5]}px;
  font-weight: bold;
`;
const LogoutText2 = styled.Text`
  color: #333333;
  font-size: ${nomalizes[10]}px;
  margin-top: ${nomalizes[5]}px;
`;
const SelectButtonWrapper = styled.View`
  width: 90%;
  height: ${nomalizes[30]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CancelButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #dbdbdb;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const OkButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #ff6258;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;
const MModal = styled.Modal``;

interface Props {
  GoToFoodAdd: () => void;
}

const HowAboutFoodAdd = ({GoToFoodAdd}: Props) => {
  const [show, setShow] = useState(true);
  const handleGood = () => {
    GoToFoodAdd();
    setShow(false);
  };
  const handleCancel = () => {
    setShow(false);
  };
  return (
    <>
      <MModal animationType="fade" visible={show} transparent={true}>
        <LogoutContainer>
          <LogoutWrapper>
            <LogoutText>Fooro에 오신 것을 환영합니다!</LogoutText>
            <LogoutText2>바로 달력에 식품을 추가해 볼까요?</LogoutText2>
            <SelectButtonWrapper>
              <CancelButton onPress={handleCancel}>
                <ButtonText>건너뛰기</ButtonText>
              </CancelButton>
              <OkButton onPress={handleGood}>
                <ButtonText>수락하기</ButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </LogoutWrapper>
        </LogoutContainer>
      </MModal>
    </>
  );
};

export default HowAboutFoodAdd;
