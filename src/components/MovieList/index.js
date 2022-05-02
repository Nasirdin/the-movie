import React from "react";
import MovieRecomendation from "../MovieContent";
import MovieHeader from "../MovieHeader";

import "./index.css";

const MovieList = ({ movieId, setMovieId }) => {
  
  return (
    <div className="movieList">
      <MovieHeader movieId={movieId} />
      <MovieRecomendation movieId={movieId} setMovieId={setMovieId} />
    </div>
  );
};

export default MovieList;
