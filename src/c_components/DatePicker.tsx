import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
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
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <TextBox text={String(day)} />
      </TouchableWithoutFeedback>
      <DatePicker
        modal
        open={open}
        date={new Date()}
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
