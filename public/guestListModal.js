//event listener needs to be added as not all DOM content referenced will be loaded immediately
document.addEventListener("DOMContentLoaded", (event) => {
  const guestListAdd = document.querySelector(".guest-list-add");
  const guestListModal = document.querySelector(".guest-list-modal");
  const guestListSubmit = document.querySelector(".guest-list-submit");

  //open modal
  guestListAdd.addEventListener("click", () => {
    guestListModal.classList.remove("hidden");
    guestListSubmit.classList.remove("hidden");
    guestListAdd.classList.add("hidden");
  });

  //close modals
});
