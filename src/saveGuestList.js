import fs from "fs";

export const saveGuestList = function (guestListCurrent) {
  fs.writeFile(
    "./data/guestListCurrent.json",
    JSON.stringify(guestListCurrent, null, 2),
    (err) => {
      if (err) {
        console.error("Failed to update guest list", err);
        res.status(500).send("Error updating the guest list.");
        return;
      }
    }
  );
};
