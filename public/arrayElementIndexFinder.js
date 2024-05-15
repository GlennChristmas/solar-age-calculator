export const arrayElementIndexFinder = function (arr, key) {
  //implementing copy on write approach from Grokking Simplicity
  let newArr = arr.slice();

  for (let i = 0; i < newArr.length; i++) {
    let elementUUID = newArr[i].uuid;
    if (elementUUID == key) {
      return i;
    }
  }
};
