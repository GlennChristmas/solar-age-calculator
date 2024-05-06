import fs from "fs";

export const loadGuestList = function () {
  //note - we've opted for readFileSync as, while blocking, is simpler to handle
  //will need to study asynchronous operations in future
  let loadedGuestList = fs.readFileSync(
    "./data/guestListCurrent.json",
    "utf8",
    (err, jsonData) => {}
  );
  //parse required as otherwise it's treated as a string; need object to e.g. work with keys
  loadedGuestList = JSON.parse(loadedGuestList);
  return loadedGuestList;
};
