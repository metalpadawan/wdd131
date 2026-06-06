const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const weeklyHours = document.querySelector("#weeklyHours");
const weeklyHoursOutput = document.querySelector("#weeklyHoursOutput");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

if (weeklyHours && weeklyHoursOutput) {
  weeklyHours.addEventListener("input", () => {
    weeklyHoursOutput.textContent = `${weeklyHours.value} hours`;
  });
}
