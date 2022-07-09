import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {Image, Modal, TouchableNativeFeedback} from 'react-native';

import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import images from '@assets/images';
import {SizedBox} from '@components/SizedBox';

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
  background-color: ${props => (props.highlite ? '#ff6258' : '#000')};
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
  flex: 1.5;
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
  flex: 8.5;
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
const Row = styled.View`
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
interface MarkProps {
  background: string;
}
interface WeekHighliteProps {
  highlite: boolean;
}
interface Props {
  GoBack: () => void;
  goToDetail: (value: number) => void;
  selected?: string;
  nickname: string;
  GoToFoodAdd: () => void;
}

const AgendaNewPresenter = ({
  GoBack,
  selected,
  goToDetail,
  GoToFoodAdd,
  nickname,
}: Props) => {
  return (
    <>
      <Container>
        <Header text={`${nickname}님의 리스트`} back={GoBack} />
        <AgendaHeader>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>일</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>월</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>화</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>수</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>목</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>금</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
          <AgendaHeaderWrapperView>
            <AgendaHeaderWrapperViewHeading>토</AgendaHeaderWrapperViewHeading>
            <AgendaHeaderWrapperViewTextWrapper highlite={true}>
              <AgendaHeaderWrapperViewText highlite={true}>
                11
              </AgendaHeaderWrapperViewText>
            </AgendaHeaderWrapperViewTextWrapper>
          </AgendaHeaderWrapperView>
        </AgendaHeader>
        <Body>
          <ContentContainer>
            <ContentContainerHeadingView>
              <ContentContainerHeadingViewHeading>
                FRI
              </ContentContainerHeadingViewHeading>
              <ContentContainerHeadingViewText>
                1
              </ContentContainerHeadingViewText>
            </ContentContainerHeadingView>
            <ContentContainerMainView>
              <MainContent>
                <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                  <Heading>과일</Heading>
                </TouchableNativeFeedback>
                <RenderContainer>
                  <RenderFlexOne>
                    <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                      <Row>
                        <Mark background="#000" />
                        <FruitText>카테고리</FruitText>
                      </Row>
                    </TouchableNativeFeedback>
                    <Row>
                      {true && (
                        <ConsumeDone>
                          <ConsumeDoneText>소비 완료</ConsumeDoneText>
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
                      {moment(new Date('2022-07-30')).format('YYYY-MM-DD')} ~{' '}
                      2022-07-30
                    </ConsumeDoneDate>
                    <ConsumeDoneDate>비공개</ConsumeDoneDate>
                  </RenderFlexOne>
                </RenderContainer>
              </MainContent>
              <MainContent>
                <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                  <Heading>과일</Heading>
                </TouchableNativeFeedback>
                <RenderContainer>
                  <RenderFlexOne>
                    <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                      <Row>
                        <Mark background="#000" />
                        <FruitText>카테고리</FruitText>
                      </Row>
                    </TouchableNativeFeedback>
                    <Row>
                      {true && (
                        <ConsumeDone>
                          <ConsumeDoneText>소비 완료</ConsumeDoneText>
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
                      {moment(new Date('2022-07-30')).format('YYYY-MM-DD')} ~{' '}
                      2022-07-30
                    </ConsumeDoneDate>
                    <ConsumeDoneDate>비공개</ConsumeDoneDate>
                  </RenderFlexOne>
                </RenderContainer>
              </MainContent>
              <MainContent>
                <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                  <Heading>과일</Heading>
                </TouchableNativeFeedback>
                <RenderContainer>
                  <RenderFlexOne>
                    <TouchableNativeFeedback onPress={() => goToDetail(10)}>
                      <Row>
                        <Mark background="#000" />
                        <FruitText>카테고리</FruitText>
                      </Row>
                    </TouchableNativeFeedback>
                    <Row>
                      {true && (
                        <ConsumeDone>
                          <ConsumeDoneText>소비 완료</ConsumeDoneText>
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
                      {moment(new Date('2022-07-30')).format('YYYY-MM-DD')} ~{' '}
                      2022-07-30
                    </ConsumeDoneDate>
                    <ConsumeDoneDate>비공개</ConsumeDoneDate>
                  </RenderFlexOne>
                </RenderContainer>
              </MainContent>
            </ContentContainerMainView>
          </ContentContainer>
        </Body>
      </Container>

      <Modal animationType="fade" visible={true} transparent={true}>
        <ModalBackground>
          <ModalButtonContainer>
            <ModalButtonWrapper>
              <ModalButtonContainerFlexRow>
                <ModalButton>
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
                <ModalButton>
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
                <ModalButton>
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
                <ModalButton>
                  <ModalButtonText>수정</ModalButtonText>
                </ModalButton>
                <SizedBox.Custom margin={nomalizes[10]} />
                <ModalButton>
                  <ModalButtonText>삭제</ModalButtonText>
                </ModalButton>
              </ModalButtonContainerFlexColumn>
            </ModalButtonWrapper>
          </ModalButtonContainer>
        </ModalBackground>
      </Modal>
    </>
  );
};

export default AgendaNewPresenter;
