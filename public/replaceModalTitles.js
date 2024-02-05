export function replaceModalTitles(keyTitles) {
  let elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    let content = element.textContent.trim();

    if (keyTitles.hasOwnProperty(content)) {
      element.innerHTML = `<strong class = "planet-detail-title">${keyTitles[content]}</strong>`;
    }
  });
}
