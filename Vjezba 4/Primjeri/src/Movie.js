import React from "react";
import { Link } from "react-router-dom";

/* export default function Movie({ title, genre, duration }) {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, title),
    React.createElement("h2", {}, genre),
    React.createElement("h2", {}, duration),
  ]);
} */

const Movie = (props) => {
  return (
    <div>
      <Link to={`${props.genre}/details/${props.id}`}>
        <h1> {props.name}</h1>
        {/* <h2>{props.genre}</h2> */}
        {/* <h3> {props.subgenre}</h3> */}
      </Link>
    </div>
  );
};

export default Movie;
