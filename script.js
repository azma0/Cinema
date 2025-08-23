const movies = [
  {
    name: "Movie One",
    category: "Action",
    time: "08:00 PM",
    image: "images/movie.png",
  },
  {
    name: "Movie Two",
    category: "Comedy",
    time: "09:30 PM",
    image: "images/movie.png",
  },
  {
    name: "Movie Three",
    category: "Drama",
    time: "07:45 PM",
    image: "images/movie.png",
  },
  {
    name: "Movie Four",
    category: "Action",
    time: "10:15 PM",
    image: "images/movie.png",
  },
];

const searchInput = document.getElementById("searchInput");
const filterCategorySelect = document.getElementById("filterCategorySelect");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersButton = document.getElementById("resetFilters");
const moviesContainer = document.getElementById("moviesContainer");
let searchedMovies = movies;

function renderMovies(list) {
  moviesContainer.innerHTML = list
    .map((movie) => {
      return `
    <div class="movie-card">
        <img class="movie-image" src="${movie.image}" alt="${movie.name}" />
        <h3>${movie.name}</h3>
        <p>Category: ${movie.category}</p>
        <p>${movie.time}</p>
    </div>
  `;
    })
    .join("");
}

searchInput.addEventListener("input", () => {
  searchedMovies = searchedMovies.filter((movie) =>
    movie.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderMovies(searchedMovies);
});

filterCategorySelect.addEventListener("change", () => {
  searchedMovies = searchedMovies.filter((movie) =>
    movie.category
      .toLowerCase()
      .includes(filterCategorySelect.value.toLowerCase())
  );
  renderMovies(searchedMovies);
});

sortSelect.addEventListener("change", () => {
  if (sortSelect.value === "name") {
    searchedMovies.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "time") {
    searchedMovies.sort((a, b) => a.time.localeCompare(b.time));
  }
  renderMovies(searchedMovies);
});

resetFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  filterCategorySelect.value = "";
  sortSelect.value = "";
  searchedMovies = movies;
  renderMovies(searchedMovies);
});

renderMovies(searchedMovies);
