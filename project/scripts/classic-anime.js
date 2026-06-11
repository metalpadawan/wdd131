const titles = [
  {
    id: "astro-boy",
    name: "Astro Boy",
    year: 1963,
    decade: "1960s",
    genre: "sci-fi",
    format: "series",
    mood: "adventurous",
    studio: "Mushi Production",
    summary: "A landmark television series about a robot child learning justice, kindness, and responsibility."
  },
  {
    id: "lupin-third",
    name: "Lupin the Third",
    year: 1971,
    decade: "1970s",
    genre: "adventure",
    format: "series",
    mood: "adventurous",
    studio: "Tokyo Movie",
    summary: "A stylish caper series following a master thief and his unpredictable crew."
  },
  {
    id: "mobile-suit-gundam",
    name: "Mobile Suit Gundam",
    year: 1979,
    decade: "1970s",
    genre: "mecha",
    format: "series",
    mood: "intense",
    studio: "Sunrise",
    summary: "A major mecha series that treats war, pilots, and machines with unusual seriousness."
  },
  {
    id: "nausicaa",
    name: "Nausicaa of the Valley of the Wind",
    year: 1984,
    decade: "1980s",
    genre: "fantasy",
    format: "film",
    mood: "thoughtful",
    studio: "Topcraft",
    summary: "A compassionate fantasy film about environmental collapse, courage, and peace."
  },
  {
    id: "akira",
    name: "Akira",
    year: 1988,
    decade: "1980s",
    genre: "sci-fi",
    format: "film",
    mood: "intense",
    studio: "Tokyo Movie Shinsha",
    summary: "A dense cyberpunk film known for its city design, motion, and explosive tension."
  },
  {
    id: "whisper-of-the-heart",
    name: "Whisper of the Heart",
    year: 1995,
    decade: "1990s",
    genre: "drama",
    format: "film",
    mood: "thoughtful",
    studio: "Studio Ghibli",
    summary: "A quiet coming-of-age film about creativity, effort, and finding a personal direction."
  },
  {
    id: "cowboy-bebop",
    name: "Cowboy Bebop",
    year: 1998,
    decade: "1990s",
    genre: "sci-fi",
    format: "series",
    mood: "intense",
    studio: "Sunrise",
    summary: "A jazz-inflected space western about bounty hunters carrying complicated pasts."
  }
];

const storageKey = "classicAnimeFavorites";

function getFavorites() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(storageKey, JSON.stringify(favorites));
}

function createTitleCard(title) {
  const favorites = getFavorites();
  const isSaved = favorites.includes(title.id);
  return `
    <article class="title-card">
      <div>
        <div class="title-meta">
          <span class="pill">${title.year}</span>
          <span class="pill">${title.decade}</span>
          <span class="pill">${title.genre}</span>
        </div>
        <h3>${title.name}</h3>
        <p><strong>Studio:</strong> ${title.studio}</p>
        <p>${title.summary}</p>
      </div>
      <button class="button secondary favorite-button ${isSaved ? "is-saved" : ""}" type="button" data-id="${title.id}">
        ${isSaved ? "Saved" : "Save Favorite"}
      </button>
    </article>
  `;
}

function renderTitles(list, container) {
  container.innerHTML = list.map(createTitleCard).join("");
}

function renderFeaturedTitles() {
  const container = document.querySelector("#featured-titles");
  if (!container) {
    return;
  }
  const featured = titles.filter((title) => ["nausicaa", "akira", "cowboy-bebop"].includes(title.id));
  renderTitles(featured, container);
}

function renderFilteredTitles() {
  const container = document.querySelector("#title-list");
  if (!container) {
    return;
  }

  const decade = document.querySelector("#decade-filter").value;
  const genre = document.querySelector("#genre-filter").value;
  const filteredTitles = titles.filter((title) => {
    const decadeMatch = decade === "all" || title.decade === decade;
    const genreMatch = genre === "all" || title.genre === genre;
    return decadeMatch && genreMatch;
  });

  renderTitles(filteredTitles, container);
  document.querySelector("#result-count").textContent = `${filteredTitles.length} title${filteredTitles.length === 1 ? "" : "s"} found.`;
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  if (favorites.includes(id)) {
    saveFavorites(favorites.filter((favoriteId) => favoriteId !== id));
  } else {
    saveFavorites([...favorites, id]);
  }
  renderFeaturedTitles();
  renderFilteredTitles();
  renderFavorites();
  updateFavoriteButtons();
}

function renderFavorites() {
  const container = document.querySelector("#favorites-list");
  if (!container) {
    return;
  }

  const favorites = getFavorites();
  const savedTitles = titles.filter((title) => favorites.includes(title.id));

  if (savedTitles.length === 0) {
    container.innerHTML = `<p class="empty-state">No favorites saved yet. Use the Title Guide to save titles for later.</p>`;
    return;
  }

  container.innerHTML = `
    <ul>
      ${savedTitles.map((title) => `<li><strong>${title.name}</strong> (${title.year}) - ${title.genre}</li>`).join("")}
    </ul>
  `;
}

function recommendTitle(preferences) {
  const exactMatch = titles.find((title) => title.mood === preferences.mood && title.format === preferences.length);
  if (exactMatch) {
    return exactMatch;
  }
  return titles.find((title) => title.mood === preferences.mood) || titles[0];
}

function handleRecommendation(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const preferences = {
    name: form.elements["viewer-name"].value.trim(),
    mood: form.elements.mood.value,
    length: form.elements["watch-length"].value
  };
  const result = recommendTitle(preferences);
  const greeting = preferences.name ? `${preferences.name}, try` : "Try";

  document.querySelector("#recommendation-result").innerHTML = `
    <article>
      <h3>${greeting} ${result.name}</h3>
      <p>${result.summary}</p>
      <p><strong>Best match:</strong> ${result.mood} ${result.format}, released in ${result.year}.</p>
      <button class="button secondary favorite-button" type="button" data-id="${result.id}">Save Favorite</button>
    </article>
  `;
  updateFavoriteButtons();
}

function updateFavoriteButtons() {
  const favorites = getFavorites();
  document.querySelectorAll(".favorite-button").forEach((button) => {
    const isSaved = favorites.includes(button.dataset.id);
    button.classList.toggle("is-saved", isSaved);
    button.textContent = isSaved ? "Saved" : "Save Favorite";
  });
}

function setupNavigation() {
  const button = document.querySelector(".menu-button");
  const menu = document.querySelector("#primary-menu");
  if (!button || !menu) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function setupEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".favorite-button");
    if (button) {
      toggleFavorite(button.dataset.id);
    }
  });

  document.querySelector("#decade-filter")?.addEventListener("change", renderFilteredTitles);
  document.querySelector("#genre-filter")?.addEventListener("change", renderFilteredTitles);
  document.querySelector("#recommendation-form")?.addEventListener("submit", handleRecommendation);
  document.querySelector("#clear-favorites")?.addEventListener("click", () => {
    saveFavorites([]);
    renderFavorites();
    updateFavoriteButtons();
  });
}

function setFooterDates() {
  document.querySelectorAll("#current-year").forEach((yearElement) => {
    yearElement.textContent = new Date().getFullYear();
  });
  document.querySelectorAll("#last-modified").forEach((modifiedElement) => {
    modifiedElement.textContent = `Last modified: ${document.lastModified}`;
  });
}

setupNavigation();
setupEvents();
renderFeaturedTitles();
renderFilteredTitles();
renderFavorites();
setFooterDates();
