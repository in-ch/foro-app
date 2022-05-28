import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import Toast from 'react-native-easy-toast';
import {useLazyQuery, useMutation} from '@apollo/client';

import {RootTabParamList} from '@navigation/RootNavigation';
import HeaderPlus from '@components/Header/HeaderPlus';
import {SizedBox} from '@components/SizedBox';
import {cHeight, nomalizes} from '@utills/constants';
import SearchInputOneLine from '@components/SearchInputOneLine';
import SelectInputNoBorderWithColor from '@components/SelectInputNoBorderWithColor';
import {LOAD_CATEGORY_DATA} from '@services/queries/category';
import {UPDATE_CATEGORY} from '@services/mutations/category';
export interface CategoryAddProps {
  navigation: NavigationProp<RootTabParamList, 'CategoryUpdate'>;
  route: RouteProp<RootTabParamList, 'CategoryUpdate'>;
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

const CategoryUpdate = ({navigation, route}: CategoryAddProps) => {
  const [value, setValue] = useState('');
  const [color, setColor] = useState('');
  const toastRef = useRef<any>(null);

  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);
  const goBack = () => {
    navigation.goBack();
  };

  const [loadCategoryData, {data}] = useLazyQuery(LOAD_CATEGORY_DATA, {
    fetchPolicy: 'network-only',
    onCompleted: d => {
      setValue(d?.loadCategoryData?.name);
    },
  });
  const handleUpdateCategory = () => {
    const vvalue = value.trim().replace('  ', '').replace('  ', '');
    if (vvalue === '' || vvalue === ' ' || vvalue === ' ') {
      showToast('카테고리명이 비어 있습니다.');
      setValue('');
    } else if (vvalue?.length < 3) {
      showToast('두글자 이상을 적어주세요.');
      setValue('');
    } else {
      mutationUpdateCategory({
        variables: {
          category: {
            no: route.params.no,
            name: value,
            color,
          },
        },
      });
    }
  };
  const [mutationUpdateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      showToast('카테고리가 수정되었습니다.');
    },
  });

  useEffect(() => {
    async function fetch() {
      await loadCategoryData({
        variables: {
          categoryNo: route.params.no,
        },
      });
      setColor(data?.loadCategoryData?.color);
    }
    fetch();
  }, [route.params.no, loadCategoryData, data?.loadCategoryData?.color]);

  return (
    <Container>
      <HeaderPlus
        text="카테고리 수정"
        back={goBack}
        button={handleUpdateCategory}
        buttonStyleText="수정"
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
          <SelectInputNoBorderWithColor color={color} setColor={setColor} />
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

export default CategoryUpdate;
