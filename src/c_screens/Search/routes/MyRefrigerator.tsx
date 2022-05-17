import React, {useState} from 'react';
import SearchInput from '@components/SearchInput';
import {nomalizes} from '@utills/constants';
import {SizedBox} from '@components/SizedBox';

const MyRefrigerator = () => {
  const [text, setText] = useState<string>('');
  return (
    <>
      <SizedBox.Custom margin={nomalizes[30]} />
      <SearchInput value={text} setValue={(value: string) => setText(value)} />
    </>
  );
};

export default MyRefrigerator;
