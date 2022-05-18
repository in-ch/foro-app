export const getListFilter = (data, value) => {
  return data?.filter(it => it?.name.includes(value));
};
