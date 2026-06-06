const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const reviewCount = document.querySelector("#reviewCount");
const reviewPlural = document.querySelector("#reviewPlural");
const reviewCountKey = "reviewCount";

const completedReviews = Number(localStorage.getItem(reviewCountKey)) || 0;
const updatedReviews = completedReviews + 1;

localStorage.setItem(reviewCountKey, updatedReviews);

reviewCount.textContent = updatedReviews;
reviewPlural.textContent = updatedReviews === 1 ? "" : "s";
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
