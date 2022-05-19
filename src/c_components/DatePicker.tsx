import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import moment from 'moment';

import TextBox from './TextBox';
import {cWidth} from '@utills/constants';

const Container = styled.View`
  min-width: ${cWidth * 0.75};
`;

interface Props {
  day: any;
  setDay: (value: any) => void;
  disable?: boolean;
}
const DDatePicker = ({day, setDay, disable = false}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={disable ? () => console.log('무혀니') : () => setOpen(true)}>
        <TextBox text={moment(day).format('YYYY / MM / DD')} />
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        date={new Date(day)}
        mode="date"
        textColor="#fff"
        onConfirm={value => {
          if (!disable) {
            setOpen(false);
            setDay(value);
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default DDatePicker;
