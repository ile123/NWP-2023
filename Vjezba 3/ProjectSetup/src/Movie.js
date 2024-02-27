import React from "react";
/* const Movie = ({ name, genre, subgenre }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, genre),
    React.createElement("h3", {}, subgenre),
  ]);
}; */

const Movie = ({ name, genre, subgenre }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{genre}</h2>
      <h3>{subgenre}</h3>
    </div>
  );
};

export default Movie;
