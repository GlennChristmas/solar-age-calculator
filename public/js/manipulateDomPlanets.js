import { replaceModalTitles as replaceModalTitles } from "/js/replaceModalTitles.js";
import { modalKeyTitles } from "/data/modalData.js";

//event listener needs to be added as not all DOM content referenced will be loaded immediately
document.addEventListener("DOMContentLoaded", (event) => {
  const planetModal = document.querySelectorAll(".planet-modal");
  const planetImage = document.querySelectorAll(".planet-image");
  const overlay = document.querySelector(".planet-overlay");
  const modalExit = document.querySelectorAll(".planet-modal-exit-button");

  //open modal
  for (let i = 0; i < planetImage.length; i++) {
    planetImage[i].addEventListener("click", () => {
      planetModal[i].classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  }

  //close modal
  for (let i = 0; i < planetModal.length; i++) {
    modalExit[i].addEventListener("click", () => {
      planetModal[i].classList.add("hidden");
      overlay.classList.add("hidden");
    });
  }

  //please be aware this approach means no children of modal title or modal content divs can be created without amendment to the function
  replaceModalTitles(modalKeyTitles);
});
