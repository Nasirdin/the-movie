import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import PopularMovies from "./components/PopularMovies/";

const App = () => {
  const [movieId, setMovieId] = useState()
  const [click, setClick] = useState(false)
  const [popularMovies, setPopularMovies] = useState([]);
  return (
    <div className="app">
      <BrowserRouter>
      <Header popularMovies={popularMovies} setPopularMovies={setPopularMovies} setClick={setClick}/>
        <Routes>
          <Route path="/" element={<PopularMovies setMovieId={setMovieId} popularMovies={popularMovies} setPopularMovies={setPopularMovies} click={click}  />}/>
          <Route path="/saved" element={<PopularMovies setMovieId={setMovieId} popularMovies={popularMovies} setPopularMovies={setPopularMovies} click={click} />}/>
          <Route path={`/movie/${movieId}`} element={<MovieList  movieId={movieId} setMovieId={setMovieId}  />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
