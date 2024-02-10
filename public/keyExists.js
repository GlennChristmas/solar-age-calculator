export const keyExists = function (arr, key) {
  return arr.some((obj) => obj.hasOwnProperty(key));
};
