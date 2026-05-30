const names = ["Nancy", "Blessing", "Jorge", "Svetlana", "Bob"];

function formatArray(values) {
  return `[${values.join(", ")}]`;
}

function renderArrayResults() {
  const namesB = names.filter((name) => name.charAt(0) === "B");
  const nameLengths = names.map((name) => name.length);
  const averageNameLength = names.reduce((total, name) => total + name.length, 0) / names.length;

  document.querySelector("#originalNames").textContent = formatArray(names);
  document.querySelector("#namesB").textContent = formatArray(namesB);
  document.querySelector("#nameLengths").textContent = formatArray(nameLengths);
  document.querySelector("#averageLength").textContent = averageNameLength;
}

const calculateButton = document.querySelector("#calculate");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

calculateButton.addEventListener("click", renderArrayResults);

renderArrayResults();

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
