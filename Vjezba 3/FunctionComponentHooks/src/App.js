import React from "react";
import { render } from "react-dom";
import Movie from "./Movie";
import SearchParams from "./SearchParams";

/* const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Movies!"),
    React.createElement(Movie, {
      title: "Birds of pray",
      genre: "comedy",
      duration: "120",
    }),
    React.createElement(Movie, {
      title: "Batman",
      genre: "action",
      duration: "150",
    }),
    React.createElement(Movie, {
      title: "Knives out",
      genre: "thriller",
      duration: "130",
    }),
  ]);
}; */

const App = () => {
  return (
    <div>
      {/* <Movie name="LOTR" genre="SF" subgenre="Fantazy" />
      <Movie name="Matrix" genre="SF" subgenre="Action" />
      <Movie name="Jumanji" genre="Comedy" subgenre="Familie" />
      <Movie name="Purge" genre="Horror" subgenre="Thriller" /> */}
      <SearchParams />
    </div>
  );
};

//render(React.createElement(App), document.getElementById("root"));
render(<App />, document.getElementById("root"));
