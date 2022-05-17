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
  goToDetail: () => void;
  selected?: string;
  GoToFoodAdd: () => void;
}
const AgendaPresenter = ({
  GoBack,
  selected,
  goToDetail,
  GoToFoodAdd,
}: Props) => {
  return (
    <Container>
      <Header text="아젠다" back={GoBack} />
      <AgendaCalendar
        selected={selected}
        goToDetail={goToDetail}
        GoToFoodAdd={GoToFoodAdd}
      />
    </Container>
  );
};

export default AgendaPresenter;
