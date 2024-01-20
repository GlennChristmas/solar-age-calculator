//event listener needs to be added as not all DOM content referenced will be loaded immediately
document.addEventListener("DOMContentLoaded", (event) => {
  const planetModal = document.querySelectorAll(".planet-modal");
  const planetImage = document.querySelectorAll(".planet-image");
  const overlay = document.querySelector(".planet-overlay");

  for (let i = 0; i < planetImage.length; i++) {
    planetImage[i].addEventListener("click", () => {
      planetModal[i].classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  }
});
