import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "./index.css";
import axios from "axios";
import { API_KEY, BASE_URL, IMG_API, LANGUAGE } from "../../helpers/constants";
import { Link } from "react-router-dom";

const MovieRecomendation = ({ movieId, setMovieId }) => {
  const [recommendationMovies, setRecommendationMovies] = useState();
  useEffect(() => {
    const getRecomendationMovie = async () => {
      try {
        await axios({
          method: "get",
          url:
            BASE_URL +
            "movie/" +
            movieId +
            "/recommendations?api_key=" +
            API_KEY +
            LANGUAGE +
            "&page=1",
        }).then(({ data }) => {
          setRecommendationMovies(data.results);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getRecomendationMovie();
  }, [movieId]);
  return (
    <div className="rec">
      <div className="container">
        <h2 className="title">Рекомендации</h2>
      </div>
      <div className="container-swiper">
        <Swiper
          className="swiper"
          spaceBetween={50}
          slidesPerView={5.4}
          breakpoints={{
            320: {
              slidesPerView: 1.4,
              spaceBetween: 20,
            },
            500: {
              slidesPerView: 3.4,
              spaceBetween: 20,
            },
            620: {
              slidesPerView: 4.4,
              spaceBetween: 30,
            },
            900: {
              slidesPerView: 5.4,
              spaceBetween: 40,
            },
          }}
        >
          {!recommendationMovies ? (
            <div>nasi</div>
          ) : (
            recommendationMovies.map((e) => (
              <SwiperSlide>
                <div className="recMovie">
                  <img src={IMG_API + e.poster_path} />

                  <div className="recMovieHover">
                    <Link
                      className="movieLook"
                      to={`/movie/${e.id}`}
                      onClick={() => setMovieId(e.id)}
                    >
                      Смотреть
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieRecomendation;
