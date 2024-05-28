export const removeElementFromArray = function (array, index) {
  const newArray = array.slice();
  if (index >= 0 && index < newArray.length) {
    newArray.splice(index, 1);
  } else {
    console.log("Error deleting record, please contact the developer.");
    return;
  }

  return newArray;
};
