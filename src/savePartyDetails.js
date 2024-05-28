import fs from "fs";

export const savePartyDetails = function (partyDetailsCurrent) {
  fs.writeFile(
    "./data/partyDetailsCurrent.json",
    JSON.stringify(partyDetailsCurrent, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Party details successfully saved!");
    }
  );
};
