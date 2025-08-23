import { describe, it, expect } from "vitest";
import {
  searchMovies,
  filterByCategory,
  sortMovies,
  applyFiltersAndSort,
} from "./cinema.js";

const movie1 = {
  name: "Coco",
  category: "Action",
  time: "07:45 PM",
  image: "images/movie.png",
};
const movie2 = {
  name: "Interstellar",
  category: "Comedy",
  time: "08:00 PM",
  image: "images/movie.png",
};
const movies = [movie1, movie2];

describe("Search Movies", () => {
  it("should search movies by name", () => {
    const result = searchMovies(movies, "Coco");
    expect(result).toEqual([movie1]);
  });

  it("should search movies by partial name (case-insensitive)", () => {
    const result = searchMovies(movies, "one");
    expect(
      result.every((movie) => movie.name.toLowerCase().includes("one"))
    ).toBe(true);
  });

  it("should search movies by partial name (case-sensitive)", () => {
    const result = searchMovies(movies, "ONE");
    expect(
      result.every((movie) => movie.name.toLowerCase().includes("one"))
    ).toBe(true);
  });

  it("should return 0 movies if not in the list", () => {
    const result = searchMovies(movies, "test-name");
    expect(result.length).toBe(0);
  });

  it("should return all movies if query is undefined", () => {
    const result = searchMovies(movies, undefined);
    expect(result.length).toBe(movies.length);
  });

  it("should return all movies if query is null", () => {
    const result = searchMovies(movies, null);
    expect(result.length).toBe(movies.length);
  });

  it("should return all movies if query is empty", () => {
    const result = searchMovies(movies, "");
    expect(result.length).toBe(movies.length);
  });
});

describe("Filter Movies by Category", () => {
  it("should filter movies by category", () => {
    const result = filterByCategory(movies, "Action");
    expect(
      result.every((movie) => movie.category.toLowerCase() === "action")
    ).toBe(true);
  });

  it("should return 0 movies if no movies in the category", () => {
    const result = filterByCategory(movies, "Nonexistent");
    expect(result.length).toBe(0);
  });

  it("should return all movies if category is undefined", () => {
    const result = filterByCategory(movies, undefined);
    expect(result.length).toBe(movies.length);
  });

  it("should return all movies if category is null", () => {
    const result = filterByCategory(movies, null);
    expect(result.length).toBe(movies.length);
  });

  it("should return all movies if category is empty", () => {
    const result = filterByCategory(movies, "");
    expect(result.length).toBe(movies.length);
  });
});

describe("Sort Movies", () => {
  it("should sort movies by name", () => {
    const result = sortMovies(movies, "name");
    expect(result[0].name).toBe("Coco");
    expect(result[1].name).toBe("Interstellar");
  });

  it("should sort movies by time", () => {
    const result = sortMovies(movies, "time");
    expect(result[0].time).toBe("07:45 PM");
    expect(result[1].time).toBe("08:00 PM");
  });

  it("should sort movies by name alphabetically", () => {
    const result = sortMovies(movies, "name");
    for (let i = 0; i < result.length - 1; i++) {
      expect(
        result[i].name.localeCompare(result[i + 1].name)
      ).toBeLessThanOrEqual(0);
    }
  });

  it("should sort movies by time", () => {
    const result = sortMovies(movies, "time");
    for (let i = 0; i < result.length - 1; i++) {
      expect(
        result[i].time.localeCompare(result[i + 1].time)
      ).toBeLessThanOrEqual(0);
    }
  });
});

describe("Apply Filters and Sort", () => {
  it("should apply filters and sort", () => {
    const result = applyFiltersAndSort(movies, "Coco", "Action", "name");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Coco");
  });

  it("should applies search query", () => {
    const result = applyFiltersAndSort(movies, "interstellar", "", "");
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Interstellar");
  });

  it("should apply category filter", () => {
    const result = applyFiltersAndSort(movies, "", "Action", "");
    expect(result.length).toBe(1);
    expect(result[0].category).toBe("Action");
  });

  it("should return all movies if only sort applied", () => {
    const result = applyFiltersAndSort(movies, "", "", "name");
    expect(result.length).toBe(movies.length);
  });

  it("should return all movies if no search query, no filters or sort applied", () => {
    const result = applyFiltersAndSort(movies, "", "", "");
    expect(result.length).toBe(movies.length);
  });
});
