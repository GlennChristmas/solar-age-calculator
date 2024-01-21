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

  /* TODO - Modularise the below (data object and function should be defined in different modules and imported
    however, I have ran into various problems attempting this so need to do some research) */
  const modalKeyTitles = {
    planetType: "Planet type",
    planetEarthFit: "How many Earths could fit inside this planet?",
    planetMoons: "Number of moons",
    planetFunFact: "Fun fact",
  };

  function replaceModalTitles(keyTitles) {
    let elements = document.querySelectorAll("*");

    elements.forEach((element) => {
      let content = element.textContent.trim();

      if (keyTitles.hasOwnProperty(content)) {
        element.innerHTML = `<strong class = "planet-detail-title">${keyTitles[content]}</strong>`;
      }
    });
  }

  //swap out shortened modal key titles to strings users would understand
  //please be aware this approach means no children of modal title or modal content divs can be created without amendment to the function
  replaceModalTitles(modalKeyTitles);
});
