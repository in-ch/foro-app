import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-easy-toast';
import {useLazyQuery, useMutation, useReactiveVar} from '@apollo/client';
import {ScrollView} from 'react-native-gesture-handler';

import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';
import {AlarmProps} from 'types/Alarm';
import {ADD_FRIEND} from '@services/mutations/user';
import {tokenUserNo} from 'apollo/client';
import {SizedBox} from '@components/SizedBox';
import {READ_ALL_ALARM} from '@services/mutations/alarm';
import images from '@assets/images';
import DDay from '@components/DDay';
import {SEND_PUSH} from '@services/mutations/push';
import {LOAD_USER} from '@services/queries/user';
import {ALTER_FOOD_OWNER} from '@services/mutations/food';

const Container = styled.View`
  width: 100%;
  min-height: ${nomalizes[100]};
  padding-top: ${nomalizes[10]}px;
`;
const Wrapper = styled.TouchableOpacity<IsReadProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${props => (props.isRead ? '#fff' : '#ffe6e4')};
  padding-top: ${nomalizes[10]}px;
  padding-left: ${nomalizes[15]}px;
  padding-right: ${nomalizes[15]}px;
  padding-bottom: ${nomalizes[10]}px;
  margin-bottom: ${nomalizes[5]}px;
`;
const ProfileContainer = styled.View`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.View`
  width: ${nomalizes[55]}px;
  height: ${nomalizes[22]}px;
  border: 1px solid #ff6258;
  margin-top: ${nomalizes[5]}px;
  border-radius: ${nomalizes[11]}px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const ButtonText = styled.Text`
  font-size: ${nomalizes[8]}px;
  color: #ff6258;
  font-family: 'Pretendard';
`;
const TextContainer = styled.View`
  padding-left: ${nomalizes[10]}px;
  padding-top: ${nomalizes[3]}px;
  display: flex;
  flex-direction: column;
  flex: 8;
`;
const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Bottom = styled.View`
  width: 100%;
  height: ${nomalizes[20]}px;
`;
const FoodText = styled.Text`
  color: #000;
  font-size: ${nomalizes[10]}px;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: ${nomalizes[2]};
  line-height: ${nomalizes[15]}px;
  font-family: 'Pretendard';
`;
const AlertWrapper = styled.View<SelectModalProps>`
  background-color: #fff;
  width: ${nomalizes[200]}px;
  height: ${nomalizes[110]}px;
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
  font-weight: bold;
`;
const AlertSub = styled.Text`
  font-size: ${nomalizes[10]}px;
  color: #333333;
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
const ModalButtonText = styled.Text`
  color: #fff;
  font-size: ${nomalizes[11]}px;
`;
const NoneContainer = styled.View`
  width: 100%;
  height: 250px;
  display: flex;
  ${cssUtil.doubleCenter};
`;
const NoneText = styled.Text`
  margin-top: ${nomalizes[10]}px;
  color: #a8a8a8;
  font-size: ${nomalizes[12]}px;
`;
const MModal = styled.Modal``;
const IImage = styled.Image``;

interface IsReadProps {
  isRead: boolean;
}
interface SelectModalProps {
  selectModal: boolean;
}
interface Props {
  myAlarm: AlarmProps[];
  loading: boolean;
  GotoFriendAgenda: (value: number) => void;
  GoToHome: () => void;
}

const ShareAlarm = ({myAlarm, loading, GotoFriendAgenda, GoToHome}: Props) => {
  const [highliteValue] = useState<string>('');
  const [doneValue, setDoneValue] = useState<string>('');
  const [selectValue] = useState<number>(0);
  const [friendNo] = useState<number | undefined>(0);
  const userNo = useReactiveVar(tokenUserNo);
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const [alarmLength, setAlarmLength] = useState<number | undefined>(0);
  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const handleEvent = () => {
    setSelectModal(false);
    const va = doneValue + `//${selectValue}//`;
    setDoneValue(va);
    mutationAddFriend();
  };
  const toastRef = useRef<any>(null);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  const [mutationAlterFoodOwner] = useMutation(ALTER_FOOD_OWNER);
  const [mutationAddFriend] = useMutation(ADD_FRIEND, {
    variables: {
      userNo,
      friendNo,
    },
    onCompleted: d => {
      if (d?.addFriend?.ok) {
        showToast('이웃 추가가 완료되었습니다.');
        lazyLoadUser({
          onCompleted: g => {
            mutationSendPush({
              variables: {
                userNo: friendNo,
                title: `${g?.loadUser?.nickname}님이 이웃추가를 수락했어요!`,
                body: `바로 ${g?.loadUser?.nickname}님의 식품 보러가기`,
                type: 2,
              },
            });
          },
        });
        setTimeout(() => {
          GoToHome();
        }, 200);
      } else {
        showToast('이미 이웃으로 추가되어 있습니다.');
      }
    },
    onError: () => {
      showToast('오류가 발생하였습니다.');
    },
  });

  const [mutationReadAllAlarm] = useMutation(READ_ALL_ALARM, {
    variables: {
      userNo,
    },
  });

  const [mutationSendPush] = useMutation(SEND_PUSH);

  const [lazyLoadUser] = useLazyQuery(LOAD_USER, {
    variables: {
      userNo,
    },
  });

  const handleAlterFoodOwner = (
    foodNo: number,
    alarmNo: number,
    fromUserNo: number,
  ) => {
    mutationAlterFoodOwner({
      variables: {
        userNo,
        foodNo,
        alarmNo,
      },
      onCompleted: d => {
        if (d?.alterFoodOwner?.ok) {
          showToast('식품을 공유받았습니다.');
          lazyLoadUser({
            onCompleted: () => {
              mutationSendPush({
                variables: {
                  userNo: fromUserNo,
                  title: `${d?.loadUser?.nickname}님이 식품을 공유해갔습니다.`,
                  body: '식품을 공유해주셔서 감사합니다.',
                  type: 4,
                },
              });
            },
          });
        } else {
          showToast('이미 공유된 식품입니다.');
        }
      },
      onError: () => {
        showToast('오류가 발생하였습니다. 관리자에게 문의해주세요.');
      },
    });
  };

  useEffect(() => {
    mutationReadAllAlarm();
    const filterdAlarm = myAlarm?.filter(alarm => {
      return alarm?.type === 2 || alarm?.type === 3;
    });
    setAlarmLength(filterdAlarm?.length);
  }, [mutationReadAllAlarm, myAlarm]);
  return (
    <ScrollView>
      {!loading ? (
        <Container>
          {myAlarm &&
            myAlarm.map((alarm: AlarmProps, index: number) => {
              if (alarm.type === 2) {
                return (
                  <Wrapper
                    isRead={
                      highliteValue.includes(`//${index}//`) || alarm.isRead
                    }
                    onPress={() =>
                      GotoFriendAgenda(Number(alarm?.fromUser?.no))
                    }>
                    <ProfileContainer>
                      <Button>
                        <ButtonText>이웃추가완료</ButtonText>
                      </Button>
                    </ProfileContainer>
                    <TextContainer>
                      <Header>
                        <FoodText numberOfLines={2}>
                          {alarm.fromUser?.nickname}님이 이웃추가를
                          수락하였습니다.
                        </FoodText>
                      </Header>
                      <Bottom>
                        <DDay time={alarm.createdAt.toString()} />
                      </Bottom>
                    </TextContainer>
                  </Wrapper>
                );
              } else if (alarm.type === 3) {
                return (
                  <Wrapper
                    isRead={
                      highliteValue.includes(`//${index}//`) || alarm.isRead
                    }
                    onPress={() =>
                      handleAlterFoodOwner(
                        Number(alarm?.food?.no),
                        Number(alarm?.no),
                        Number(alarm?.fromUser?.no),
                      )
                    }>
                    <ProfileContainer>
                      <Button>
                        <ButtonText>공유 알림</ButtonText>
                      </Button>
                    </ProfileContainer>
                    <TextContainer>
                      <Header>
                        <FoodText numberOfLines={2}>
                          {alarm.fromUser?.nickname}님이 식품을 단체 공유했어요.
                          지금 바로 가져가세요.
                        </FoodText>
                      </Header>
                      <Bottom>
                        <DDay time={alarm.createdAt.toString()} />
                      </Bottom>
                    </TextContainer>
                  </Wrapper>
                );
              }
            })}

          <MModal animationType="fade" visible={selectModal} transparent={true}>
            <ModalBackground>
              <AlertWrapper selectModal={selectModal}>
                <AlertText>이웃 추가를 하시겠습니까?</AlertText>
                <AlertSub>이웃의 식품을 보고 공유할 수 있어요!</AlertSub>
                <SelectButtonWrapper>
                  <CancelButton onPress={cancelSelectModal}>
                    <ModalButtonText>취소</ModalButtonText>
                  </CancelButton>
                  <OkButton onPress={handleEvent}>
                    <ModalButtonText>확인</ModalButtonText>
                  </OkButton>
                </SelectButtonWrapper>
              </AlertWrapper>
            </ModalBackground>
          </MModal>
          <Toast
            ref={toastRef}
            positionValue={cHeight * 0.5}
            fadeInDuration={400}
            fadeOutDuration={1200}
          />
        </Container>
      ) : (
        <NoneContainer>
          <IImage
            style={{
              width: nomalizes[100],
              height: nomalizes[100],
            }}
            source={images.loading}
          />
        </NoneContainer>
      )}

      {Number(alarmLength) < 1 && (
        <NoneContainer>
          <IImage
            style={{
              width: nomalizes[80],
              height: nomalizes[80],
            }}
            source={images.noSearch}
          />
          <NoneText>알림이 아직 없습니다.</NoneText>
        </NoneContainer>
      )}
      <SizedBox.Custom margin={nomalizes[150]} />
    </ScrollView>
  );
};

export default ShareAlarm;
