import React, {useCallback, useRef, useState} from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-easy-toast';

import Header from '@components/Header/Header';
import {cHeight, cWidth, nomalizes} from '@utills/constants';
import {cssUtil} from '@utills/cssUtil';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[14]}px;
  margin-top: ${nomalizes[20]}px;
  margin-bottom: ${nomalizes[5]}px;
  color: #272727;
  font-family: 'Pretendard';
`;
// const TText = styled.Text`
//   font-size: ${nomalizes[12]}px;
//   color: #272727;
//   font-family: 'Pretendard';
// `;
// const Row = styled.View`
//   width: 86%;
//   margin-left: 7%;
//   height: ${nomalizes[40]}px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;
const LoadingContainer = styled.View`
  background-color: white;
  width: ${cWidth}px;
  height: ${cHeight + nomalizes[50]}px;
  display: flex;
  ${cssUtil.doubleCenter};
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
const TTouchable = styled.TouchableNativeFeedback``;
const AActivityIndicator = styled.ActivityIndicator``;
const MModal = styled.Modal``;
interface Props {
  GoBack: () => void;
  goToTerms: () => void;
  goToPersonalPolicy: () => void;
  handleNeighborShareAbled: () => void;
  handleNeighborShareNewsAbled: () => void;
  neighborShareAbled: boolean;
  neighborShareNewsAbled: boolean;
  loading: boolean;
  Logout: () => void;
}
interface SelectModalProps {
  selectModal: boolean;
}
const SettingPresenter = ({
  GoBack,
  goToTerms,
  goToPersonalPolicy,
  Logout,
  // handleNeighborShareAbled,
  // handleNeighborShareNewsAbled,
  // neighborShareAbled,
  // neighborShareNewsAbled,
  loading,
}: Props) => {
  const [selectModal, setSelectModal] = useState<boolean>(false);
  const cancelSelectModal = () => {
    setSelectModal(false);
  };
  const handleEvent = () => {
    setSelectModal(false);
    Logout();
    showToast('탈퇴 완료까지 최대 일주일정도 소요될 수 있습니다.');
  };
  const toastRef = useRef<any>(null);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

  return (
    <>
      <Container>
        <Header text="설정" back={GoBack} />
        <Wrapper>
          {/* <Heading>알림</Heading> */}
          {/* <Row>
            <TText>이웃의 나눔 요청 받기</TText>
            <Switch
              trackColor={{false: '#a8a8a8', true: '#FF6C63'}}
              thumbColor={neighborShareAbled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#a3a3a3"
              value={neighborShareAbled}
              onValueChange={handleNeighborShareAbled}
            />
          </Row>
          <Row>
            <TText>이웃의 식품 공유 소식 받기</TText>
            <Switch
              trackColor={{false: '#a8a8a8', true: '#FF6C63'}}
              thumbColor={neighborShareNewsAbled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#a3a3a3"
              value={neighborShareNewsAbled}
              onValueChange={handleNeighborShareNewsAbled}
            />
          </Row> */}
          <TTouchable onPress={goToPersonalPolicy}>
            <Heading>개인 정보 처리 방침</Heading>
          </TTouchable>
          <TTouchable onPress={goToTerms}>
            <Heading>이용 약관</Heading>
          </TTouchable>
          <TTouchable onPress={() => setSelectModal(true)}>
            <Heading>Fooro 탈퇴</Heading>
          </TTouchable>
        </Wrapper>
      </Container>

      {loading && (
        <LoadingContainer>
          <AActivityIndicator animating={true} size="small" color="#000" />
        </LoadingContainer>
      )}

      <MModal animationType="fade" visible={selectModal} transparent={true}>
        <ModalBackground>
          <AlertWrapper selectModal={selectModal}>
            <AlertText>푸로를 탈퇴하시겠습니까?</AlertText>
            <AlertSub>처리까지 일주일 정도 소요될 수 있습니다.</AlertSub>
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
        positionValue={cHeight * 0.1}
        fadeInDuration={400}
        fadeOutDuration={1200}
      />
    </>
  );
};

export default SettingPresenter;
