//event listener needs to be added as not all DOM content referenced will be loaded immediately
document.addEventListener("DOMContentLoaded", (event) => {
  const planetModal = document.querySelectorAll(".planet-modal");
  const planetImage = document.querySelectorAll(".planet-image");
  const overlay = document.querySelector(".planet-overlay");
  const modalExit = document.querySelectorAll(".planet-modal-exit-button");

  for (let i = 0; i < planetImage.length; i++) {
    planetImage[i].addEventListener("click", () => {
      planetModal[i].classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  }

  for (let i = 0; i < planetModal.length; i++) {
    modalExit[i].addEventListener("click", () => {
      planetModal[i].classList.add("hidden");
      overlay.classList.add("hidden");
    });
  }
});
