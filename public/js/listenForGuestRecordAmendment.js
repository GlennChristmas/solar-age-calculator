document.addEventListener("DOMContentLoaded", (event) => {
  const guestRecordEdit = document.querySelectorAll(
    ".guest-record-button.edit"
  );
  const guestRecordDelete = document.querySelectorAll(
    ".guest-record-button.delete"
  );

  //listen out for guest record deletions
  for (let i = 0; i < guestRecordDelete.length; i++) {
    guestRecordDelete[i].addEventListener("click", (event) => {
      //extract record id from element and assign to var
      var recordUUID = event.currentTarget.getAttribute("data-id");

      //in order to send something to the server, it must be in a string format - JSON is often used for this
      let jsonString = JSON.stringify({ recordUUID: recordUUID });

      //now send a POST request to server with body contents being the jsonString generated above
      fetch("/delete-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          //required for DOM to update when record is deleted - as fetch more ordinarily used in single page applications
          location.reload();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  //listen out for guest record edits
  for (let i = 0; i < guestRecordEdit.length; i++) {
    guestRecordEdit[i].addEventListener("click", (event) => {
      let recordUUID = event.currentTarget.getAttribute("data-id");

      fetch("/guest-edit-send-uuid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guestId: recordUUID }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Technical issues extracting the guest record, sorry."
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("hello there!");
          console.log("Success: ", data);
          return fetch("/party-planning-guest-edit", {
            method: "GET",
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Technical issues loading the page to edit the guest record, sorry."
            );
          }
          return response.text();
        })
        .then((html) => {
          console.log("GET request was successful: ");
          //use the generated html to overwrite existing client-side contents
          document.open();
          document.write(html);
          document.close();
        })
        .then((html) => {
          console.log(
            "Now rerendering party-planning page with guest list element to edit..."
          );
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
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    });
  }
});
