import React from 'react';
import {Image, Modal} from 'react-native';
import Toast from 'react-native-easy-toast';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import images from '@assets/images';
import HeaderPlus from '@components/Header/HeaderPlus';
import NoResult from '@components/NoResult';
import {SizedBox} from '@components/SizedBox';
import {cHeight, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {CategoryData} from '~/types/Category';

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
  font-family: 'Pretendard';
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
  color: #272727;
  font-family: 'Pretendard';
`;
const Hr = styled.View`
  background-color: #f5f5f5;
  width: 90%;
  height: 2px;
`;
const WideHr = styled.View`
  background-color: #f5f5f5;
  width: 100%;
  margin-top: ${nomalizes[5]}px;
  margin-bottom: ${nomalizes[5]}px;
  height: ${nomalizes[10]}px;
`;
interface Props {
  goBack: () => void;
  goToCategoryAdd: () => void;
  goToCategoryUpdate: (value: number) => void;
  modalShow: boolean;
  onShowModal: (value: number) => void;
  data: CategoryData[];
  defaultCategory: CategoryData[];
  categoryNo: number;
  handleDeleteCategory: () => void;
  toastRef: any;
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
  categoryNo,
  data,
  handleDeleteCategory,
  toastRef,
  defaultCategory,
}: Props) => {
  const goToUpdate = (no: number) => {
    onShowModal(no);
    goToCategoryUpdate(no);
  };
  return (
    <Container>
      <>
        <HeaderPlus
          text="카테고리 관리"
          back={goBack}
          button={goToCategoryAdd}
          buttonStyleText="추가"
          buttonStyle={true}
        />
        <SizedBox.Custom margin={nomalizes[10]} />
        {defaultCategory?.map((category: CategoryData) => {
          return (
            <Box>
              <Row>
                <Mark color={category?.color} />
                <TText>{category?.name}</TText>
              </Row>
              <RowRight onPress={() => onShowModal(category?.no)}>
                <Image
                  style={{
                    width: nomalizes[16],
                    height: nomalizes[16],
                  }}
                  source={images.setting}
                />
              </RowRight>
            </Box>
          );
        })}

        <WideHr />

        {data?.map((category: CategoryData) => {
          return (
            <Box>
              <Row>
                <Mark color={category?.color} />
                <TText>{category?.name}</TText>
              </Row>
              <RowRight onPress={() => onShowModal(category?.no)}>
                <Image
                  style={{
                    width: nomalizes[16],
                    height: nomalizes[16],
                  }}
                  source={images.setting}
                />
              </RowRight>
            </Box>
          );
        })}

        {data?.length < 1 && <NoResult text="카테고리가 없습니다." />}

        <Modal animationType="fade" visible={modalShow} transparent={true}>
          <Wrapper>
            <ModalExtra onPress={() => onShowModal(0)} />
            <ModalContentBox>
              <TouchableWithoutFeedback onPress={handleDeleteCategory}>
                <ModalText>삭제하기</ModalText>
              </TouchableWithoutFeedback>
              <Hr />
              <TouchableWithoutFeedback onPress={() => goToUpdate(categoryNo)}>
                <ModalText>수정하기</ModalText>
              </TouchableWithoutFeedback>
            </ModalContentBox>
          </Wrapper>
        </Modal>
      </>
      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.5}
        fadeInDuration={200}
        fadeOutDuration={1200}
      />
    </Container>
  );
};

export default CategoryPresenter;
