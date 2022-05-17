import React from 'react';
import {Image, Modal} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import images from '~/assets/images';
import HeaderPlus from '~/c_components/Header/HeaderPlus';
import {SizedBox} from '~/c_components/SizedBox';
import {nomalizes} from '~/utills/constants';
import {cssUtil} from '~/utills/cssUtil';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Box = styled.View`
  width: 100%;
  height: ${nomalizes[25]}px;
  display: flex;
  flex-direction: row;
  margin-top: ${nomalizes[10]}px;
`;
const Row = styled.View`
  display: flex;
  flex: 8;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${nomalizes[20]}px;
  height: ${nomalizes[25]}px;
`;
const RowRight = styled.TouchableOpacity`
  display: flex;
  flex: 2;
  margin-right: ${nomalizes[10]}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const Mark = styled.View<ColorProps>`
  width: ${nomalizes[12]}px;
  height: ${nomalizes[12]}px;
  border-radius: ${nomalizes[3]}px;
  margin-right: ${nomalizes[7]}px;
  background-color: ${props => props.color};
`;
const TText = styled.Text`
  color: #000;
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
`;
const Hr = styled.View`
  background-color: #f5f5f5;
  width: 90%;
  height: 2px;
`;
interface Props {
  goBack: () => void;
  goToCategoryAdd: () => void;
  goToCategoryUpdate: () => void;
  modalShow: boolean;
  onShowModal: () => void;
}
interface ColorProps {
  color: string;
}

const CategoryPresenter = ({
  goBack,
  modalShow,
  onShowModal,
  goToCategoryAdd,
  goToCategoryUpdate,
}: Props) => {
  const goToUpdate = () => {
    onShowModal();
    goToCategoryUpdate();
  };
  return (
    <Container>
      <HeaderPlus text="카테고리 관리" back={goBack} button={goToCategoryAdd} />
      <SizedBox.Custom margin={nomalizes[10]} />
      <Box>
        <Row>
          <Mark color="#e7a6a6" />
          <TText>과일</TText>
        </Row>
        <RowRight onPress={onShowModal}>
          <Image
            style={{
              width: nomalizes[16],
              height: nomalizes[16],
            }}
            source={images.setting}
          />
        </RowRight>
      </Box>
      <Box>
        <Row>
          <Mark color="#e7a6a6" />
          <TText>과일</TText>
        </Row>
        <RowRight onPress={onShowModal}>
          <Image
            style={{
              width: nomalizes[16],
              height: nomalizes[16],
            }}
            source={images.setting}
          />
        </RowRight>
      </Box>
      <Box>
        <Row>
          <Mark color="#e7a6a6" />
          <TText>과일</TText>
        </Row>
        <RowRight onPress={onShowModal}>
          <Image
            style={{
              width: nomalizes[16],
              height: nomalizes[16],
            }}
            source={images.setting}
          />
        </RowRight>
      </Box>

      <Modal animationType="fade" visible={modalShow} transparent={true}>
        <Wrapper>
          <ModalExtra onPress={onShowModal} />
          <ModalContentBox>
            <TouchableWithoutFeedback>
              <ModalText>삭제하기</ModalText>
            </TouchableWithoutFeedback>
            <Hr />
            <TouchableWithoutFeedback onPress={goToUpdate}>
              <ModalText>수정하기</ModalText>
            </TouchableWithoutFeedback>
          </ModalContentBox>
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default CategoryPresenter;
