export const groupBy = (xs, key) => {
  if (xs === undefined || xs === null) {
    return [];
  } else {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
};

export const sortByGroup = (unordered, selected) => {
  let selectedData;
  if (selected === undefined) {
    selectedData = '2023-00-00';
  } else {
    selectedData = selected;
  }
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      if (key >= selectedData) {
        if (obj === undefined) {
          obj = {};
        }
        obj[key] = unordered[key];
        return obj;
      }
    }, {});
};
