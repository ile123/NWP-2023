import React from "react";
import Movie from "./Movie";

const Result = ({ data, genre }) => {
  return (
    <div>
      {data.map((item) => (
        <Movie name={item.name} genre={genre} id={item.id} />
      ))}
    </div>
  );
};

export default Result;
