import getCountries from "./fetchData.js";

const input_box = document.getElementById("search_input");
const suggestion_box = document.getElementById("suggestion_box");
const noResult = document.getElementById("no_results");

const populateSuggestionBox = (countries) => {
  if (countries.length > 0) {
    noResult.classList.remove("visible");
    suggestion_box.classList.add("visible");
    const fragment = document.createDocumentFragment();
    countries.forEach((countryName) => {
      const li = document.createElement("li");
      li.textContent = countryName;
      fragment.appendChild(li);
    });
    suggestion_box.appendChild(fragment);
  } else {
    suggestion_box.classList.remove("visible");
    noResult.classList.add("visible");
  }
};

const handleSuggestion = async (e) => {
  try {
    const val = e.target.value.trim();
    if (val.length <= 2) {
      suggestion_box.classList.remove("visible");
      noResult.classList.remove("visible");
      return;
    }
    let countryNameArr = await getCountries(val);
    countryNameArr = countryNameArr.map((country) => country?.name?.common);
    populateSuggestionBox(countryNameArr);
  } catch (error) {
    console.log("error while fetching data Handle Suggestion : ", error);
  }
};

function debounce(fn, delay = 1000) {
  let debounceToken;
  return function (...args) {
    if (debounceToken) {
      clearTimeout(debounceToken);
    }
    debounceToken = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

input_box.addEventListener("input", debounce(handleSuggestion, 500));

suggestion_box.addEventListener("click", (event) => {
  const selectedCountry = event.target.textContent;
  input_box.value = selectedCountry;
  suggestion_box.classList.remove("visible");
  noResult.classList.remove("visible");
});
