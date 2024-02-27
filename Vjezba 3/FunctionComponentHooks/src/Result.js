import React from "react";
import Movie from "./Movie";

const Result = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <Movie name={item.name} />
      ))}
    </div>
  );
};

export default Result;
