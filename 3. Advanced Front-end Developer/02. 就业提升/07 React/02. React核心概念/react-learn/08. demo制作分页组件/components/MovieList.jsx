import React from "react";
import "./Movie.css";
import Movie from "./Movie";

export default function MovieList(props) {
  if (!props.movies) return null;
  return (
    <div className="imgContainer">
      {props.movies.map((movie, index) => {
        return <Movie movie={movie} key={index} />;
      })}
    </div>
  );
}
