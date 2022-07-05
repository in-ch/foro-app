import React from 'react';

import Header from '@components/Header/Header';

interface Props {
  GoBack: () => void;
}

const NewAgendaPresneter = ({GoBack}: Props) => {
  return (
    <>
      <Header text="00회원님의 리스트" back={GoBack} />
    </>
  );
};

export default NewAgendaPresneter;
