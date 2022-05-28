export const getListFilter = (data, value) => {
  return data?.filter(it => it?.name.includes(value));
};

export const getDateListFilter = (data, value) => {
  return data?.filter(it => it?.dday.includes(value));
};

export const getNoListFilter = (data, value) => {
  return data?.filter(it => it?.no.includes(value));
};

export const removeItems = (arr, value) => {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
};
