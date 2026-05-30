const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/7cf8e8b9e5a5a1f379d4e2c9bc2166f9c6007aca/full/800%2C/0/default",
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/64de5983126b11eca393eeeeac1e50dfc2db6c7e/full/800%2C/0/default",
  },
  {
    templeName: "Bountiful Utah",
    location: "Bountiful, Utah, United States",
    dedicated: "1995, January, 8",
    area: 104000,
    imageUrl:
      "https://www.churchofjesuschrist.org/imgs/0ef41c19f3cd8113dba38d4dfdca16a5d06cdcd5/full/800%2C/0/default",
  },
];

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const navLinks = document.querySelectorAll("#navigation a");
const albumTitle = document.querySelector("#albumTitle");
const templeCards = document.querySelector("#templeCards");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

function getDedicationYear(temple) {
  return Number(temple.dedicated.slice(0, 4));
}

function createTempleCard(temple) {
  return `<article class="temple-card">
    <h2>${temple.templeName}</h2>
    <p><span>Location:</span> ${temple.location}</p>
    <p><span>Dedicated:</span> ${temple.dedicated}</p>
    <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
  </article>`;
}

function renderTemples(templeList) {
  templeCards.innerHTML = templeList.map(createTempleCard).join("");
}

function filterTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getDedicationYear(temple) < 1900);
    case "new":
      return temples.filter((temple) => getDedicationYear(temple) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

function setActiveFilter(selectedLink) {
  navLinks.forEach((link) => {
    link.removeAttribute("aria-current");
  });

  selectedLink.setAttribute("aria-current", "page");
}

function closeMobileMenu() {
  menuButton.classList.remove("open");
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  navigation.classList.toggle("open");

  const isOpen = menuButton.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;
    const filterName = link.textContent;

    albumTitle.textContent = filterName;
    renderTemples(filterTemples(filter));
    setActiveFilter(link);
    closeMobileMenu();
  });
});

renderTemples(temples);

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
