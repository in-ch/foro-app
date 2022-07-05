import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header/Header';
import AgendaCalendar from '@components/AgendaCalendar/AgendaCalendar';

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
const AgendaPresenter = ({
  GoBack,
  selected,
  goToDetail,
  GoToFoodAdd,
  nickname,
}: Props) => {
  return (
    <Container>
      <Header text={`${nickname}님의 리스트`} back={GoBack} />
      <AgendaCalendar
        selected={selected}
        goToDetail={goToDetail}
        GoToFoodAdd={GoToFoodAdd}
      />
    </Container>
  );
};

export default AgendaPresenter;
