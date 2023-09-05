import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMG_API, BASE_URL, API_KEY, LANGUAGE } from "../../helpers/constants";
import { FiBookmark } from "@react-icons/all-files/fi/FiBookmark";
import "./index.css";

const MovieHeader = ({ movieId }) => {
  const [movie, setMovie] = useState();
  const [saved, setSaved] = useState(false);
  const localStorageItemLike = localStorage.getItem(`like`);
  const localStorageItem = localStorage.getItem(`thisMovie${movieId}`);
  const jsonToObjectMovie = JSON.parse(localStorageItem);
  useEffect(() => {
    if (!localStorageItemLike) {
    } else {
      const jsonToObjectLikeMovie = JSON.parse(localStorageItemLike);
      jsonToObjectLikeMovie.filter((e) => {
        if (e.id !== movieId) {
          setSaved(false);
        } else {
          setSaved(true);
        }
      });
    }
    const getMovie = async () => {
      if (!jsonToObjectMovie) {
        await axios({
          method: "get",
          url: BASE_URL + "movie/" + movieId + "?api_key=" + API_KEY + LANGUAGE,
        })
          .then(({ data }) => {
            setMovie(data);
            localStorage.setItem(
              `thisMovie${movieId}`,
              `${JSON.stringify(data)}`
            );
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (jsonToObjectMovie.id * 1 === movieId) {
        setMovie(jsonToObjectMovie);
      }
    };
    getMovie();
  }, [movieId]);

  const saveLocal = (movieSave) => {
    if (!localStorageItemLike) {
      let savedLocalLike = JSON.stringify([movieSave]);
      localStorage.setItem(`like`, [savedLocalLike]);
    } else {
      const jsonToObjectLikeMovie = JSON.parse(localStorageItemLike);
      if (!saved) {
        let savedLocalLike = JSON.stringify([
          ...jsonToObjectLikeMovie,
          movieSave,
        ]);
        localStorage.setItem(`like`, savedLocalLike);
      } else {
        const removeItem = jsonToObjectLikeMovie?.filter((e) => {
          return e.id !== movieSave.id;
        });
        let savedLocalLike = JSON.stringify(removeItem);
        localStorage.setItem(`like`, [savedLocalLike]);
      }
    }
  };

  return (
    <div className="movieListHeader">
      {!movie ? (
        <p>Loading</p>
      ) : (
        <div>
          <img
            className="movieBackgrounImg"
            src={IMG_API + movie.backdrop_path}
            alt="background-img"
          />
          <div className="container">
            <div className="movieImgBlock">
              <img
                className="moviePosterImg"
                src={IMG_API + movie.poster_path}
                alt="poster-img"
              />
            </div>
            <div className="movieInfo">
              <h2 className="movieTitile">{movie.title}</h2>

              <div className="movieGenresAndRating">
                <div
                  className={`movieRating ${
                    movie.vote_average < 5
                      ? "bad"
                      : movie.vote_average > 5 && movie.vote_average < 7.5
                      ? "good"
                      : "great"
                  }`}
                >
                  <p>{movie.vote_average}</p>
                </div>
                <ul className="movieGenres">
                  {movie.genres?.map((e) => (
                    <li className="movieGenre">{e.name}</li>
                  ))}
                </ul>
              </div>
              <p className="movieTagLine">{movie.tagline}</p>
              <p className="movieDiscription">{movie.overview}</p>
              <h3 className="movieCompanyTitle">Производственные компании</h3>
              <ul className="movieProductionCompanies">
                {movie.production_companies?.map((e) => (
                  <li className="movieProductionCompany">{e.name}</li>
                ))}
              </ul>
              <FiBookmark
                className={`fiBookMark ${!saved ? "" : "active"}`}
                title={`${!saved ? "Сохранить" : "Сохранен"}`}
                onClick={() => {
                  if (!saved) {
                    setSaved(true);
                  } else {
                    setSaved(false);
                  }
                  saveLocal(movie);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieHeader;
