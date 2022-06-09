import React, {useCallback, useState} from 'react';
import {Image, Modal} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';

import {isAndroid, nomalizes} from '@utills/constants';
import images from '@assets/images';

const Container = styled.View`
  width: 100%;
  height: ${nomalizes[40]}px;
`;
const HHeader = styled.View`
  width: 100%;
  height: ${nomalizes[40]}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Row = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TText = styled.Text`
  font-size: ${nomalizes[16]}px;
  font-weight: bold;
  padding-right: ${nomalizes[5]}px;
  color: rgb(50, 50, 50);
  font-family: 'Pretendard';
`;

interface Props {
  date: string;
  GoToAgenda: () => void;
  setCurrent: (value: string) => void;
}

const Header = ({date, GoToAgenda, setCurrent}: Props) => {
  const ddate = new Date(date);
  const month = ddate.getMonth();
  const year = ddate.getFullYear();

  // 데이터 픽업 관련
  const [dateP, setDateP] = useState<Date | String>(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = useCallback(
    (_event: any, newDate: string) => {
      const selectedDate = newDate || dateP;

      showPicker(false);
      setDateP(selectedDate);
      setCurrent(String(moment(new Date(selectedDate)).format('YYYY-MM')));
    },
    [dateP, showPicker, setCurrent],
  );
  return (
    <>
      <Container>
        <HHeader>
          <Row onPress={() => setShow(true)}>
            <TText>
              {year}년 {month + 1}월
            </TText>
            <Image
              style={{
                width: nomalizes[5],
                height: nomalizes[5],
              }}
              source={images.arrowDown}
            />
          </Row>
          <Row onPress={GoToAgenda}>
            <Image
              style={{
                width: nomalizes[17],
                height: nomalizes[17],
              }}
              source={images.list}
            />
          </Row>
        </HHeader>
      </Container>
      {!isAndroid
        ? show && (
            <Modal animationType="slide" visible={show} transparent={true}>
              <MonthPicker
                onChange={onValueChange}
                value={date}
                minimumDate={new Date(2022, 1)}
                maximumDate={new Date(2024, 5)}
                locale="ko"
              />
            </Modal>
          )
        : show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              minimumDate={new Date(2022, 1)}
              maximumDate={new Date(2024, 5)}
              locale="ko"
            />
          )}
    </>
  );
};

export default Header;
