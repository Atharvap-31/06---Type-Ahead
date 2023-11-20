const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => cities.push(...data));

function findCities(words, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(words, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayCities() {
  const matchCity = findCities(this.value, cities);

  const html = matchCity
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const city = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const state = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${numberWithCommas(
              place.population
            )}</span>
            </li>`;
    })
    .join("");

  suggestions.innerHTML = html;
}

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

search.addEventListener("change", displayCities);
search.addEventListener("keyup", displayCities);
