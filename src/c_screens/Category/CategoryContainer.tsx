import React, {useState} from 'react';
import CategoryPresenter from './CategoryPresenter';
import {CategoryProps} from './Category';
import {useQuery} from '@apollo/client';
import {LOAD_CATEGORY} from '~/c_services/queries/category';

const CategoryContainer = ({navigation}: CategoryProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const goBack = () => {
    navigation.goBack();
  };
  const goToCategoryAdd = () => {
    navigation.navigate('CategoryAdd', {});
  };
  const goToCategoryUpdate = () => {
    navigation.navigate('CategoryUpdate', {});
  };
  const onShowModal = () => {
    setModalShow(!modalShow);
  };

  const {data} = useQuery(LOAD_CATEGORY, {
    variables: {
      userNo: 1,
    },
  });
  return (
    <CategoryPresenter
      goBack={goBack}
      goToCategoryAdd={goToCategoryAdd}
      goToCategoryUpdate={goToCategoryUpdate}
      modalShow={modalShow}
      onShowModal={onShowModal}
      data={data?.loadCategory}
    />
  );
};

export default CategoryContainer;
