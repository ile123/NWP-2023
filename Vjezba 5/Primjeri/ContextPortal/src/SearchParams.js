import React, { useState, useEffect, useContext } from "react";
import Result from "./Result";
//const moviesGenres = ["drama", "SF", "Familie", "Horror"];
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Split, Croatia");
  const [genre, setGenre] = useState("Drama");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

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
    <div>
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

        <select onChange={(e) => setTheme(e.target.value)}>
          <option>select colour</option>
          <option value="Red">red</option>
          <option value="Aquamarine">blue</option>
          <option value="BlueViolet">violet</option>
          <option value="Chartreuse">green</option>
        </select>

        <label>
          {genre}
          <br />
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option>All</option>
            {genres.map((item) => (
              <option key={`${item}-key`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          style={{ backgroundColor: theme }}
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
      </form>
      <Result data={movies} genre={genre} />
    </div>
  );
};

export default SearchParams;
