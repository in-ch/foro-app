import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';

import CategoryPresenter from './CategoryPresenter';
import {CategoryProps} from './Category';
import {LOAD_CATEGORY} from '@services/queries/category';
import {DELETE_CATEGORY} from '@services/mutations/category';
import {useIsFocused} from '@react-navigation/native';

const CategoryContainer = ({navigation}: CategoryProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [categoryNo, setCategoryNo] = useState(0);
  const isFocused = useIsFocused();
  const toastRef = useRef<any>(null);
  const showToast = useCallback((text: string) => {
    toastRef.current.show(text);
  }, []);

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

  const [mutationDeleteCategory] = useMutation(DELETE_CATEGORY, {
    variables: {
      categoryNo,
    },
    onCompleted: () => {
      setModalShow(false);
      refetch();
      showToast('삭제가 완료되었습니다.');
    },
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
      handleDeleteCategory={mutationDeleteCategory}
      toastRef={toastRef}
    />
  );
};

export default CategoryContainer;
