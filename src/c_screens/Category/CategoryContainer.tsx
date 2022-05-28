import React, {useEffect, useState} from 'react';
import CategoryPresenter from './CategoryPresenter';
import {CategoryProps} from './Category';
import {useQuery} from '@apollo/client';
import {LOAD_CATEGORY} from '@services/queries/category';
import {useIsFocused} from '@react-navigation/native';

const CategoryContainer = ({navigation}: CategoryProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [categoryNo, setCategoryNo] = useState(0);
  const isFocused = useIsFocused();
  const goBack = () => {
    navigation.goBack();
  };
  const goToCategoryAdd = () => {
    navigation.navigate('CategoryAdd', {});
  };
  const goToCategoryUpdate = (no: number) => {
    navigation.navigate('CategoryUpdate', {
      no,
    });
  };
  const onShowModal = async (value: number) => {
    setModalShow(!modalShow);
    await setCategoryNo(value);
  };

  const {data, refetch} = useQuery(LOAD_CATEGORY, {
    variables: {
      userNo: 1,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);
  return (
    <CategoryPresenter
      goBack={goBack}
      goToCategoryAdd={goToCategoryAdd}
      goToCategoryUpdate={(value: number) => goToCategoryUpdate(value)}
      modalShow={modalShow}
      onShowModal={onShowModal}
      data={data?.loadCategory}
      categoryNo={categoryNo}
    />
  );
};

export default CategoryContainer;
