import React, {useState} from 'react';
import {NeighborProp} from './ Neighbor';
import NeighborPresenter from './ NeighborPresenter';

const NeighborContainer = ({navigation}: NeighborProp) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [modalShow, setModalShow] = useState<boolean>(false);
  const onShowModal = () => {
    setModalShow(!modalShow);
  };
  return (
    <NeighborPresenter
      modalShow={modalShow}
      onShowModal={onShowModal}
      goBack={goBack}
    />
  );
};

export default NeighborContainer;
