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
});
