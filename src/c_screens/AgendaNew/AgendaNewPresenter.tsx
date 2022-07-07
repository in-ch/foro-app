import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

interface Props {
  GoBack: () => void;
  goToDetail: (value: number) => void;
  selected?: string;
  nickname: string;
  GoToFoodAdd: () => void;
}

const AgendaNewPresenter = ({
  GoBack,
  selected,
  goToDetail,
  GoToFoodAdd,
  nickname,
}: Props) => {
  return (
    <Container>
      <Header text={`${nickname}님의 리스트`} back={GoBack} />
    </Container>
  );
};

export default AgendaNewPresenter;
