export const keyValueExtractor = function (arr, fieldName) {
  let extractedKeyValue = arr[fieldName];

  if (extractedKeyValue == undefined) {
    extractedKeyValue = "";
  }

  return extractedKeyValue;
};
