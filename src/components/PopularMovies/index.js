import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  API_KEY,
  BASE_URL,
  GENRES__API,
  IMG_API,
  LANGUAGE,
} from "../../helpers/constants";
import "./index.css";

const PopularMovies = ({
  setMovieId,
  popularMovies,
  setPopularMovies,
  click,
}) => {
  const location = window.location;
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [savedMovies, setSavedMovies] = useState();

  useEffect(() => {
    if (location.pathname === "/saved") {
      const savedMovies = localStorage.getItem("like");
      const jsonToArray = JSON.parse(savedMovies);
      setSavedMovies(jsonToArray);
    }
    if (fetching) {
      try {
        axios({
          method: "get",
          url:
            BASE_URL +
            "discover/movie?sort_by=popularity.desc&api_key=" +
            API_KEY +
            "&page=" +
            currentPage +
            LANGUAGE,
        })
          .then(({ data }) => {
            setPopularMovies([...popularMovies, ...data.results]);
            setCurrentPage((prev) => prev + 1);
          })
          .finally(() => setFetching(false));
      } catch (e) {
        console.error(e);
      }
    }
  }, [fetching, click]);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="popularMovies">
      <div className="container">
        {location.pathname !== "/saved" ? (
          <div className="cards">
            {!popularMovies
              ? "loading..."
              : popularMovies.map((e) => (
                  <div className="card">
                    <div className="cardImgBlock">
                      <img
                        className="cardPosterImg"
                        src={IMG_API + e.poster_path}
                        alt="poster-img"
                      />
                    </div>
                    <div className="cardTextContent">
                      <Link
                        to={`/movie/${e.id}`}
                        onClick={() => setMovieId(e.id)}
                        className="cardTitle"
                      >
                        {e.title}
                      </Link>
                      <p className="cardInfo">{e.release_date}</p>
                    </div>
                  </div>
                ))}
          </div>
        ) : (
          <div className="cards">
            {!savedMovies
              ? "Вы еще не сохранили ни один фильм"
              : savedMovies.map((e) => (
                  <div className="card">
                    <div className="cardImgBlock">
                      <img
                        className="cardPosterImg"
                        src={IMG_API + e.poster_path}
                        alt="poster-img"
                      />
                    </div>
                    <div className="cardTextContent">
                      <Link
                        to={`/${e.id}`}
                        onClick={() => setMovieId(e.id)}
                        className="cardTitle"
                      >
                        {e.title}
                      </Link>
                      <p className="cardInfo">{e.release_date}</p>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
