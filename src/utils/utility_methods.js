export const groupBy = (array, key) => {
  return array.reduce((r, a) => {
    r[a[key]] = [...(r[a[key]] || []), a];
    return r;
  }, {});
};

export const isObjectEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

export const formattedAmount = (number) => {
  return parseFloat(number).toFixed(2).toString();
};