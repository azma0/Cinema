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

export function searchMovies(list, query) {
  if (!query) return list;
  return list.filter((movie) =>
    movie.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function filterByCategory(list, category) {
  if (!category) return list;
  return list.filter(
    (movie) => movie.category.toLowerCase() === category.toLowerCase()
  );
}

export function sortMovies(list, key) {
  if (!key) return list;
  const sorted = [...list];
  if (key === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (key === "time") {
    sorted.sort((a, b) => a.time.localeCompare(b.time));
  }
  return sorted;
}

function renderMovies(list) {
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = list
    .map(
      (movie) => `
    <div class="movie-card">
        <img class="movie-image" src="${movie.image}" alt="${movie.name}" />
        <h3>${movie.name}</h3>
        <p>Category: ${movie.category}</p>
        <p>${movie.time}</p>
    </div>
  `
    )
    .join("");
}

export function applyFiltersAndSort(
  movies,
  searchInputValue,
  filterCategorySelectValue,
  sortSelectValue
) {
  let currentMovies = searchMovies(movies, searchInputValue);
  currentMovies = filterByCategory(currentMovies, filterCategorySelectValue);
  currentMovies = sortMovies(currentMovies, sortSelectValue);
  return currentMovies;
}

function initUI() {
  const searchInput = document.getElementById("searchInput");
  const filterCategorySelect = document.getElementById("filterCategorySelect");
  const sortSelect = document.getElementById("sortSelect");
  const resetFiltersButton = document.getElementById("resetFilters");

  let currentMovies = [...movies];

  function updateView() {
    renderMovies(currentMovies);
  }

  function _applyFiltersAndSort() {
    currentMovies = applyFiltersAndSort(
      movies,
      searchInput.value,
      filterCategorySelect.value,
      sortSelect.value
    );
    updateView();
  }

  searchInput.addEventListener("input", () => {
    _applyFiltersAndSort();
  });

  filterCategorySelect.addEventListener("change", () => {
    _applyFiltersAndSort();
  });

  sortSelect.addEventListener("change", () => {
    _applyFiltersAndSort();
  });

  resetFiltersButton.addEventListener("click", () => {
    searchInput.value = "";
    filterCategorySelect.value = "";
    sortSelect.value = "";
    currentMovies = [...movies];
    updateView();
  });

  updateView();
}

if (typeof document !== "undefined") {
  initUI();
}
