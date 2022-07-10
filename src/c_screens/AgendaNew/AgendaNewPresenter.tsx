/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Image, Modal, Text, TouchableNativeFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast';

import Header from '@components/Header/Header';
import Loading from '@components/Loading';
import {SizedBox} from '@components/SizedBox';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';
import {getWeek} from '@utills/getWeek';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
const AgendaHeader = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[60]}px;
  background-color: #ffffff;
  padding-left: ${nomalizes[20]}px;
  padding-right: ${nomalizes[20]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const AgendaHeaderWrapperView = styled.View`
  width: ${nomalizes[30]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const AgendaHeaderWrapperViewHeading = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: #a8a8a8;
`;
const AgendaHeaderWrapperViewTextWrapper = styled.View<WeekHighliteProps>`
  margin-top: ${nomalizes[7]}px;
  display: flex;
  width: ${nomalizes[24]}px;
  height: ${nomalizes[24]}px;
  border-radius: ${nomalizes[12]}px;
  background-color: ${props => (props.highlite ? '#ff6258' : '#fff')};
  ${cssUtil.doubleCenter};
`;
const AgendaHeaderWrapperViewText = styled.Text<WeekHighliteProps>`
  font-size: ${nomalizes[12]}px;
  color: ${props => (props.highlite ? '#fff' : '#000')};
  text-align: center;
`;
const Body = styled.View`
  background-color: #f1f1f1;
  width: ${cWidth}px;
  height: ${cHeight}px;
  padding-left: ${nomalizes[20]}px;
  padding-right: ${nomalizes[20]}px;
`;
const ContentContainer = styled.View`
  width: 100%;
  margin-top: ${nomalizes[25]}px;
  display: flex;
  flex-direction: row;
`;
const ContentContainerHeadingView = styled.View`
  padding-top: ${nomalizes[25]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1.8;
  margin-right: ${nomalizes[15]}px;
`;
const ContentContainerHeadingViewHeading = styled.Text`
  font-size: ${nomalizes[11]}px;
  color: #757575;
`;
const ContentContainerHeadingViewText = styled.Text`
  font-size: ${nomalizes[14]}px;
  color: #000;
  font-weight: bold;
  margin-top: ${nomalizes[5]}px;
`;

const ContentContainerMainView = styled.View`
  border-radius: ${nomalizes[10]}px;
  background-color: white;
  flex: 8.2;
  padding: ${nomalizes[20]}px;
  padding-top: ${nomalizes[10]}px;
`;
const MainContent = styled.View`
  margin-top: ${nomalizes[10]}px;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  color: rgb(50, 50, 50);
  font-weight: bold;
`;
const RenderContainer = styled.View`
  height: ${nomalizes[40]}px;
  margin-top: ${nomalizes[5]}px;
`;
const RenderFlexOne = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${nomalizes[10]}px;
  height: ${nomalizes[20]}px;
  align-items: center;
`;
const Row = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  ${cssUtil.doubleCenter};
`;
const FruitText = styled.Text`
  margin-left: ${nomalizes[5]}px;
  font-size: ${nomalizes[12]}px;
  color: RGB(50, 50, 50);
  font-family: 'Pretendard';
`;
const ConsumeDone = styled.View`
  width: ${nomalizes[26]}px;
  height: ${nomalizes[10]}px;
  border-radius: ${nomalizes[2]}px;
  margin-right: ${nomalizes[5]}px;
  background-color: #ffd9d7;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const ConsumeDoneText = styled.Text`
  font-size: ${nomalizes[5]}px;
  color: #ff6c63;
  font-family: 'Pretendard';
`;
const ConsumeDoneDate = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #a8a8a8;
`;
const Mark = styled.View<MarkProps>`
  width: ${nomalizes[10]}px;
  height: ${nomalizes[10]}px;
  border-radius: ${nomalizes[3]}px;
  background-color: ${props =>
    props.background ? props.background : '#637cff'};
`;
const ModalBackground = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  padding: ${nomalizes[30]}px;
  position: absolute;
  top: 0px;
  right: 0px;
  flex-direction: row;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[40]}px;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ModalBackgroundExtra = styled.View`
  width: ${cWidth}px;
  height: ${cHeight - nomalizes[150]}px;
  position: absolute;
  top: 0px;
  left: 0px;
`;
const ModalButtonContainer = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[200]}px;
  border-top-left-radius: ${nomalizes[25]}px;
  border-top-right-radius: ${nomalizes[25]}px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  padding-top: ${nomalizes[30]}px;
`;
const ModalButtonWrapper = styled.View`
  width: 100%;
  padding-left: ${nomalizes[10]}px;
  padding-right: ${nomalizes[10]}px;
  height: ${nomalizes[150]}px;
`;
const ModalButtonContainerFlexRow = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: ${nomalizes[50]}px;
`;
const ModalButtonContainerFlexColumn = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  margin-top: ${nomalizes[10]}px;
  height: ${nomalizes[80]}px;
`;

const ModalButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  height: 100%;
  margin-left: ${nomalizes[5]}px;
  margin-right: ${nomalizes[5]}px;
  flex: 1;
  border-radius: ${nomalizes[10]}px;
  ${cssUtil.doubleCenter};
`;
const ModalButtonText = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #000;
`;
const PlushButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 99;
  background-color: #ff6258;
  bottom: ${nomalizes[30]}px;
  right: ${nomalizes[30]}px;
  width: ${nomalizes[40]}px;
  height: ${nomalizes[40]}px;
  border-radius: ${nomalizes[20]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const NoneContainer = styled.View`
  width: ${cWidth}px;
  height: ${nomalizes[400]}px;
  display: flex;
  padding-right: ${cWidth * 0.1}px;
  ${cssUtil.doubleCenter};
`;
const AlertWrapper = styled.View<SelectModalProps>`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[90]}px;
  border-radius: ${nomalizes[20]}px;
  display: ${props => (props.selectModal ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  padding: ${nomalizes[10]}px;
  position: absolute;
  top: ${cHeight / 2 - nomalizes[45]}px;
  left: ${cWidth / 2 - nomalizes[100]}px;
  justify-content: space-between;
`;
const AlertText = styled.Text`
  color: #333333;
  font-size: ${nomalizes[12]}px;
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
  background-color: #ff6258;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const OkButton = styled.TouchableOpacity`
  width: 48%;
  height: ${nomalizes[30]}px;
  background-color: #dbdbdb;
  border-radius: ${nomalizes[8]}px;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;

interface MarkProps {
  background: string;
}
interface WeekHighliteProps {
  highlite: boolean;
}
interface SelectModalProps {
  selectModal: boolean;
}
interface Props {
  GoBack: () => void;
  goToDetail: (value: number) => void;
  nickname: string;
  GoToFoodAdd: () => void;
  selectedShow: (id: number) => void;
  showModal: boolean;
  foodData: any;
  thisWeek: string[];
  thisDay: string;
  weekData: string[];
  loading: boolean;
  shareFood: () => void;
  consumeFood: () => void;
  publicFood: () => void;
  updateFood: () => void;
  deleteFood: () => void;
  selectModal: boolean;
  cancelSelectModal: () => void;
  selectModalText: string;
  handleEvent: () => void;
  toastRef: any;
}

const AgendaNewPresenter = ({
  GoBack,
  goToDetail,
  GoToFoodAdd,
  nickname,
  selectedShow,
  showModal,
  foodData,
  thisWeek,
  thisDay,
  weekData,
  loading,
  shareFood,
  consumeFood,
  publicFood,
  updateFood,
  deleteFood,
  selectModal,
  cancelSelectModal,
  selectModalText,
  handleEvent,
  toastRef,
}: Props) => {
  return (
    <>
      <Container>
        <Header text={`${nickname}님의 리스트`} back={GoBack} />
        <AgendaHeader>
          {thisWeek.map((week: string, index: number) => {
            return (
              <AgendaHeaderWrapperView>
                <AgendaHeaderWrapperViewHeading>
                  {weekData[index]}
                </AgendaHeaderWrapperViewHeading>
                <AgendaHeaderWrapperViewTextWrapper
                  highlite={index === Number(thisDay)}>
                  <AgendaHeaderWrapperViewText
                    highlite={index === Number(thisDay)}>
                    {week.substr(8)}
                  </AgendaHeaderWrapperViewText>
                </AgendaHeaderWrapperViewTextWrapper>
              </AgendaHeaderWrapperView>
            );
          })}
        </AgendaHeader>

        {loading ? (
          <Loading />
        ) : (
          <Body>
            <ScrollView>
              {foodData !== undefined ? (
                Object.keys(foodData)?.map((foodKey: string) => {
                  return (
                    <ContentContainer>
                      <ContentContainerHeadingView>
                        <ContentContainerHeadingViewHeading>
                          {getWeek(foodKey)}
                        </ContentContainerHeadingViewHeading>
                        <ContentContainerHeadingViewText>
                          {foodKey.substr(8)}
                        </ContentContainerHeadingViewText>
                      </ContentContainerHeadingView>
                      <ContentContainerMainView>
                        {foodData[foodKey]?.map((food: any) => {
                          return (
                            <MainContent>
                              <TouchableNativeFeedback
                                onPress={() => goToDetail(food.no)}>
                                <Heading>{food.name}</Heading>
                              </TouchableNativeFeedback>
                              <RenderContainer>
                                <RenderFlexOne>
                                  <TouchableNativeFeedback
                                    onPress={() => goToDetail(food.no)}>
                                    <Row>
                                      <Mark
                                        background={food.category.categoryColor}
                                      />
                                      <FruitText>
                                        {food.category.name}
                                      </FruitText>
                                    </Row>
                                  </TouchableNativeFeedback>
                                  <Row onPress={() => selectedShow(food.no)}>
                                    {food.consumed && (
                                      <ConsumeDone>
                                        <ConsumeDoneText>
                                          소비 완료
                                        </ConsumeDoneText>
                                      </ConsumeDone>
                                    )}
                                    <Image
                                      style={{
                                        width: nomalizes[10],
                                        height: nomalizes[10],
                                      }}
                                      source={images.setting}
                                    />
                                  </Row>
                                </RenderFlexOne>
                                <RenderFlexOne>
                                  <ConsumeDoneDate>
                                    {moment(new Date('2022-07-30')).format(
                                      'YYYY-MM-DD',
                                    )}{' '}
                                    ~ {food.dday}
                                  </ConsumeDoneDate>
                                  {food.onlyMe && (
                                    <ConsumeDoneDate>비공개</ConsumeDoneDate>
                                  )}
                                </RenderFlexOne>
                              </RenderContainer>
                            </MainContent>
                          );
                        })}
                      </ContentContainerMainView>
                    </ContentContainer>
                  );
                })
              ) : (
                <NoneContainer>
                  <Image
                    style={{
                      width: nomalizes[80],
                      height: nomalizes[80],
                    }}
                    source={images.bigSearch}
                  />
                  <SizedBox.Custom margin={nomalizes[20]} />
                  <Text style={{fontSize: nomalizes[12], color: '#797979'}}>
                    등록된 식품이 없습니다.
                  </Text>
                  <Text style={{fontSize: nomalizes[12], color: '#797979'}}>
                    상품을 추가해보세요.
                  </Text>
                </NoneContainer>
              )}
              <SizedBox.Custom margin={nomalizes[150]} />
            </ScrollView>
          </Body>
        )}
      </Container>

      <Modal animationType="fade" visible={showModal} transparent={true}>
        <ModalBackground>
          <TouchableNativeFeedback onPress={() => selectedShow(1)}>
            <ModalBackgroundExtra />
          </TouchableNativeFeedback>
          <ModalButtonContainer>
            <ModalButtonWrapper>
              <ModalButtonContainerFlexRow>
                <ModalButton onPress={shareFood}>
                  <Image
                    style={{
                      width: nomalizes[16],
                      height: nomalizes[16],
                    }}
                    source={images.share}
                  />
                  <SizedBox.Custom margin={nomalizes[5]} />
                  <ModalButtonText>공유</ModalButtonText>
                </ModalButton>
                <ModalButton onPress={consumeFood}>
                  <Image
                    style={{
                      width: nomalizes[16],
                      height: nomalizes[16],
                    }}
                    source={images.consumed}
                  />
                  <SizedBox.Custom margin={nomalizes[5]} />
                  <ModalButtonText>소비완료</ModalButtonText>
                </ModalButton>
                <ModalButton onPress={publicFood}>
                  <Image
                    style={{
                      width: nomalizes[16],
                      height: nomalizes[16],
                    }}
                    source={images.public}
                  />
                  <SizedBox.Custom margin={nomalizes[5]} />
                  <ModalButtonText>공개전환</ModalButtonText>
                </ModalButton>
              </ModalButtonContainerFlexRow>
              <ModalButtonContainerFlexColumn>
                <ModalButton onPress={updateFood}>
                  <ModalButtonText>수정</ModalButtonText>
                </ModalButton>
                <SizedBox.Custom margin={nomalizes[10]} />
                <ModalButton onPress={deleteFood}>
                  <ModalButtonText>삭제</ModalButtonText>
                </ModalButton>
              </ModalButtonContainerFlexColumn>
            </ModalButtonWrapper>
          </ModalButtonContainer>

          <AlertWrapper selectModal={selectModal}>
            <AlertText>{selectModalText}</AlertText>
            <SelectButtonWrapper>
              <CancelButton onPress={cancelSelectModal}>
                <ButtonText>취소</ButtonText>
              </CancelButton>
              <OkButton onPress={handleEvent}>
                <ButtonText>확인</ButtonText>
              </OkButton>
            </SelectButtonWrapper>
          </AlertWrapper>
        </ModalBackground>
      </Modal>

      <PlushButton onPress={GoToFoodAdd}>
        <Image
          style={{
            width: nomalizes[18],
            height: nomalizes[18],
          }}
          source={images.plusWhite}
        />
      </PlushButton>

      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.1}
        fadeInDuration={400}
        fadeOutDuration={1200}
      />
    </>
  );
};

export default AgendaNewPresenter;
