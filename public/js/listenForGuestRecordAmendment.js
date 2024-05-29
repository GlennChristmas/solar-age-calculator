document.addEventListener("DOMContentLoaded", (event) => {
  const guestRecordEdit = document.querySelectorAll(
    ".guest-record-button.edit"
  );
  const guestRecordDelete = document.querySelectorAll(
    ".guest-record-button.delete"
  );

  //Listen out for guest record deletions
  for (let i = 0; i < guestRecordDelete.length; i++) {
    guestRecordDelete[i].addEventListener("click", async (event) => {
      try {
        //Extract record id from element and assign to var
        var recordUUID = event.currentTarget.getAttribute("data-id");
        let jsonString = JSON.stringify({ recordUUID: recordUUID });

        //Now send a POST request to server with body contents being the jsonString generated above

        let response = await fetch("/delete-guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonString,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        //required for DOM to update when record is deleted
        location.reload();
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }

  //listen out for guest record edits
  for (let i = 0; i < guestRecordEdit.length; i++) {
    guestRecordEdit[i].addEventListener("click", async (event) => {
      let recordUUID = event.currentTarget.getAttribute("data-id");

      try {
        const sendUUID = await fetch("/guest-edit-send-uuid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guestId: recordUUID }),
        });

        if (!sendUUID.ok) {
          throw new Error(
            "Technical issues extracting the guest record, sorry."
          );
        }

        const loadPartyPlanning = await fetch("/party-planning-guest-edit", {
          method: "GET",
        });

        if (!loadPartyPlanning.ok) {
          throw new Error(
            "Technical issues loading the page to edit the guest record, sorry."
          );
        }

        const html = await loadPartyPlanning.text();
        //use the generated html to overwrite existing client-side contents
        document.open();
        document.write(html);
        document.close();

        //unfortunately the previous promise means the document has been replaced
        //we'll therefore need to remap guestListAdd/Modal/Submit again - we probably ought to find a cleaner way of doing this
        const guestListAdd = document.querySelector(".guest-list-add");
        const guestListModal = document.querySelector(".guest-list-modal");
        const guestListSubmit = document.querySelector(".guest-list-submit");
        guestListModal.classList.remove("hidden");
        guestListSubmit.classList.remove("hidden");
        guestListAdd.classList.add("hidden");

        document
          .querySelectorAll(".guest-record-container")
          .forEach((element) => {
            element.classList.add("hidden");
          });
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  }
});
