/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import HeaderPlus from '@components/Header/HeaderPlus';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import images from '@assets/images';
import {cssUtil} from '@utills/cssUtil';

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
  color: rgb(37, 37, 37);
  font-family: 'Pretendard';
`;
const ImageContainer = styled.View`
  width: ${nomalizes[36]}px;
  height: ${nomalizes[36]}px;
  border-radius: ${nomalizes[18]}px;
  overflow: hidden;
`;
const TTouchableOpacity = styled.TouchableOpacity`
  background-color: #e4e4e4;
  width: 90%;
  border-radius: ${nomalizes[10]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;

const IImage = styled.Image``;
const MModal = styled.Modal``;

interface Props {
  goBack: () => void;
  modalShow: boolean;
  onShowModal: () => void;
  kakaoshare: () => void;
  friendsData: any;
  goToFriendAdd: () => void;
}
const NeighborPresenter = ({
  goBack,
  modalShow,
  onShowModal,
  kakaoshare,
  friendsData,
  goToFriendAdd,
}: Props) => {
  console.log(friendsData.loadFriendFood);
  return (
    <Container>
      <HeaderPlus text="이웃 관리" back={goBack} button={goToFriendAdd} />
      <SizedBox.Custom margin={nomalizes[15]} />
      {friendsData?.loadFriendFood &&
        friendsData?.loadFriendFood.map((data: any) => {
          return (
            <RowBox>
              <Row>
                <ImageContainer>
                  <IImage
                    style={{
                      width: nomalizes[36],
                      height: nomalizes[36],
                    }}
                    source={{uri: data.profile}}
                  />
                </ImageContainer>
                <TText>{data.nickname}</TText>
              </Row>
              <Row>
                <TouchableWithoutFeedback onPress={onShowModal}>
                  <IImage
                    style={{
                      width: nomalizes[16],
                      height: nomalizes[16],
                    }}
                    source={images.setting}
                  />
                </TouchableWithoutFeedback>
              </Row>
            </RowBox>
          );
        })}

      <MModal animationType="fade" visible={modalShow} transparent={true}>
        <Wrapper>
          <ModalExtra onPress={onShowModal} />
          <ModalContentBox>
            <TTouchableOpacity onPress={() => console.warn('')}>
              <ModalText>이웃 삭제하기</ModalText>
            </TTouchableOpacity>
          </ModalContentBox>
        </Wrapper>
      </MModal>
    </Container>
  );
};

export default NeighborPresenter;
