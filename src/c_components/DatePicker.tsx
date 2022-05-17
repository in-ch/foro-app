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
const DDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <TextBox text={String(moment(date).format('YYYY / MM / DD'))} />
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        textColor="#fff"
        locale="kr"
        onConfirm={value => {
          setOpen(false);
          setDate(value);
          console.log(value);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default DDatePicker;
