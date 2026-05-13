const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  navigation.classList.toggle("open");

  const isOpen = menuButton.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
