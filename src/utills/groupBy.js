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

export const sortByGroup = unordered => {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};
