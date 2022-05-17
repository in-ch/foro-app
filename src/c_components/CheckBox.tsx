import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import styled from 'styled-components/native';
import {nomalizes} from '~/utills/constants';

const Container = styled.View`
  margin-top: ${nomalizes[10]}px;
`;
interface Props {
  text: string;
}

const CCheckBox = ({text}: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <Container>
      <CheckBox
        onClick={() => {
          setClicked(!clicked);
        }}
        isChecked={clicked}
        rightText={text}
      />
    </Container>
  );
};

export default CCheckBox;
