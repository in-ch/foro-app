import React, {useState} from 'react';
import styled from 'styled-components/native';

import SearchInput from '@components/SearchInput';
import {SizedBox} from '@components/SizedBox';
import {nomalizes} from '@utills/constants';
import CCheckBox from '~/c_components/CheckBox';

const Wrapper = styled.View`
  width: 90%;
  margin-left: 5%;
  margin-top: ${nomalizes[30]}px;
  min-height: ${nomalizes[40]}px;
`;
const Heading = styled.Text`
  font-size: ${nomalizes[13]}px;
`;
const FriendRefrigerator = () => {
  const [text, setText] = useState<string>('');
  return (
    <>
      <SizedBox.Custom margin={nomalizes[30]} />
      <SearchInput value={text} setValue={(value: string) => setText(value)} />
      <Wrapper>
        <Heading>이웃 01</Heading>
        <CCheckBox text="친구가 작성한 식품 01" />
        <CCheckBox text="친구가 작성한 식품 02" />
      </Wrapper>
      <Wrapper>
        <Heading>이웃 02</Heading>
        <CCheckBox text="친구가 작성한 식품 01" />
        <CCheckBox text="친구가 작성한 식품 02" />
        <CCheckBox text="친구가 작성한 식품 03" />
      </Wrapper>
    </>
  );
};

export default FriendRefrigerator;
