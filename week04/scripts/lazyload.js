const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const images = document.querySelectorAll("main img");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

images.forEach((image) => {
  if (image.complete) {
    image.classList.add("loaded");
  } else {
    image.addEventListener("load", () => {
      image.classList.add("loaded");
    });
  }
});
