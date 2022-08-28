import React, {useCallback, useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useMutation, useReactiveVar} from '@apollo/client';
import Toast from 'react-native-easy-toast';

import {RootTabParamList} from '@navigation/RootNavigation';
import {INSERT_CATEGORY} from '@services/mutations/category';
import {LOAD_CATEGORY} from '@services/queries/category';
import {cHeight, nomalizes} from '@utills/constants';
import SearchInputOneLine from '@components/SearchInputOneLine';
import SelectInputNoBorder from '@components/SelectInputNoBorder';
import HeaderPlus from '@components/Header/HeaderPlus';
import {SizedBox} from '@components/SizedBox';
import {tokenUserNo} from '~/apollo/client';
export interface CategoryAddProps {
  navigation: NavigationProp<RootTabParamList, 'CategoryAdd'>;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const RowBox = styled.View`
  width: 100%;
  min-height: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const CategoryAdd = ({navigation}: CategoryAddProps) => {
  const [value, setValue] = useState('');
  const [color, setColor] = useState('#43419A');
  const toastRef = useRef<any>(null);
  const userNo = useReactiveVar(tokenUserNo);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);
  const goBack = () => {
    navigation.goBack();
  };
  const handleAddCategory = () => {
    const vvalue = value.trim().replace('  ', '').replace('  ', '');
    if (vvalue === '' || vvalue === ' ' || vvalue === ' ') {
      showToast('카테고리명이 비어 있습니다.');
      setValue('');
    } else if (vvalue?.length < 2) {
      showToast('두글자 이상을 적어주세요.');
      setValue('');
    } else {
      mutationCategoryAdd({
        variables: {
          userNo,
          category: {
            name: vvalue,
            color: color,
          },
        },
      });
    }
  };
  const [mutationCategoryAdd] = useMutation(INSERT_CATEGORY, {
    onCompleted: () => {
      showToast('카테고리가 추가되었습니다.');
      setValue('');
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: e => {
      console.log(JSON.stringify(e));
    },
    update(cache, {data}) {
      let dataCategoryQuery = cache.readQuery<any>({
        query: LOAD_CATEGORY,
        variables: {
          userNo,
        },
      });
      const newData = [data.insertCategory, ...dataCategoryQuery.loadCategory];
      cache.writeQuery({
        query: LOAD_CATEGORY,
        variables: {
          userNo,
        },
        data: {
          loadCategory: newData,
        },
      });
    },
  });
  return (
    <Container>
      <HeaderPlus
        text="카테고리 추가"
        back={goBack}
        button={handleAddCategory}
        buttonStyleText="완료"
        buttonStyle={true}
      />
      <SizedBox.Custom margin={nomalizes[10]} />
      <SearchInputOneLine
        value={value}
        setValue={setValue}
        placeholder="카테고리 이름 입력"
      />
      <SizedBox.Custom margin={nomalizes[15]} />
      <RowBox>
        <Row>
          <SelectInputNoBorder setColor={setColor} />
        </Row>
      </RowBox>
      <Toast
        ref={toastRef}
        positionValue={cHeight * 0.5}
        fadeInDuration={200}
        fadeOutDuration={1200}
      />
    </Container>
  );
};

export default CategoryAdd;
