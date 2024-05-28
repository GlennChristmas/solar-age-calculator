import fs from "fs";

export const loadPartyDetails = function () {
  //note - we've opted for readFileSync as, while blocking, is simpler to handle
  //will need to study asynchronous operations in future
  let loadedPartyDetails = fs.readFileSync(
    "./data/partyDetailsCurrent.json",
    "utf8",
    (err, jsonData) => {}
  );
  //parse required as otherwise it's treated as a string; need object to e.g. work with keys
  loadedPartyDetails = JSON.parse(loadedPartyDetails);
  return loadedPartyDetails;
};
