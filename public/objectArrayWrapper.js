export const objectArrayWrapper = function (obj) {
  return Object.keys(obj).map((key) => {
    return { [key]: obj[key] };
  });
};
