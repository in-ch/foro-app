export const getListFilter = (data, value) => {
  return data?.filter(it => it?.name.includes(value));
};

export const getDateListFilter = (data, value) => {
  return data?.filter(it => it?.dday.includes(value));
};
