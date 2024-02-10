export const getValueByKey = function (arr, key) {
  const foundObj = arr.find((obj) => obj.hasOwnProperty(key));
  return foundObj ? foundObj[key] : undefined;
};

const newObj = [{ partyLocation: "spain" }, { partyDate: "" }];
