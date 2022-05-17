import React from 'react';
import styled from 'styled-components/native';
import HeaderPlus from '@components/Header/HeaderPlus';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import {Image, Modal} from 'react-native';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const RowBox = styled.View`
  width: 92%;
  margin-left: 4%;
  min-height: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TText = styled.Text`
  color: #000;
  font-size: ${nomalizes[14]}px;
  margin-left: ${nomalizes[10]}px;
`;
const Wrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ModalExtra = styled.TouchableOpacity`
  flex: 8;
`;
const ModalContentBox = styled.View`
  background-color: #fff;
  border-top-left-radius: ${nomalizes[25]}px;
  border-top-right-radius: ${nomalizes[25]}px;
  flex: 2;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const ModalText = styled.Text`
  font-size: ${nomalizes[12]}px;
  margin-top: ${nomalizes[15]}px;
  margin-bottom: ${nomalizes[15]}px;
  color: rgb(50, 50, 50);
`;

interface Props {
  goBack: () => void;
  modalShow: boolean;
  onShowModal: () => void;
}
const NeighborPresenter = ({goBack, modalShow, onShowModal}: Props) => {
  return (
    <Container>
      <HeaderPlus
        text="이웃 관리"
        back={goBack}
        button={() => console.warn('ggg')}
      />
      <SizedBox.Custom margin={nomalizes[15]} />
      <RowBox>
        <Row>
          <Image
            style={{
              width: nomalizes[30],
              height: nomalizes[30],
            }}
            source={images.user}
          />
          <TText>이웃 닉네임</TText>
        </Row>
        <Row>
          <TouchableWithoutFeedback onPress={onShowModal}>
            <Image
              style={{
                width: nomalizes[16],
                height: nomalizes[16],
              }}
              source={images.setting}
            />
          </TouchableWithoutFeedback>
        </Row>
      </RowBox>

      <Modal animationType="fade" visible={modalShow} transparent={true}>
        <Wrapper>
          <ModalExtra onPress={onShowModal} />
          <ModalContentBox>
            <TouchableWithoutFeedback onPress={() => console.warn('')}>
              <ModalText>이웃 삭제하기</ModalText>
            </TouchableWithoutFeedback>
          </ModalContentBox>
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default NeighborPresenter;
