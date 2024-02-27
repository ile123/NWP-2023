import React, { useState, useEffect } from "react";
import Result from "./Result";
//const moviesGenres = ["drama", "SF", "Familie", "Horror"];

const SearchParams = () => {
  const [location, setLocation] = useState("Split, Croatia");
  const [genre, setGenre] = useState("Drama");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  async function getMovieGenres() {
    const movieGenres = await fetch("https://demo7168568.mockable.io/genres");

    const json = await movieGenres.json();

    const result = await json.genres;

    setGenres(result);
  }

  function getMoviesByGenre() {
    const response = fetch(
      `https://demo7168568.mockable.io/${genre}/movies`
    ).then((value) => value.json().then(({ movies }) => setMovies(movies)));
  }

  useEffect(() => {
    getMovieGenres();
  }, []);

  /* useEffect(() => {
    getMoviesByGenre();
  }, [genre]); */

  return (
    <form>
      <label htmlFor="location">
        Location: {location}
        <br />
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="location"
        />
      </label>
      <br />

      <label>
        {genre}
        <br />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>All</option>
          {genres.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </label>

      <button
        onClick={(e) => {
          e.preventDefault();
          getMoviesByGenre(e.target.value);
        }}
      >
        Submit
      </button>

      {/* {movies.map((item) => (
        <Movie name={item.name} />
      ))} */}
      <Result data={movies} />
    </form>
  );
};

export default SearchParams;
