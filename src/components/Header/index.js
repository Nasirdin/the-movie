import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, LANGUAGE, SEARCH_API } from "../../helpers/constants";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import "./index.css";
const Header = ({ setPopularMovies, setClick}) => {
  const [searchItem, setSeachItem] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!searchItem) {
      return;
    }
    const search = async () => {
      try {
        await axios({
          method: "get",
          url: BASE_URL + SEARCH_API + searchItem + LANGUAGE,
        }).then(({ data }) => {
          setPopularMovies(data.results);
        });
      } catch (error) {
        console.log(error);
      }
    };
    search();
  }, [searchItem]);
  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="header">
      <div
        className={`burger ${!active ? '' : 'activeB' }`}
        onClick={() => {
          if(!active) {
            setActive(true)
          } else {
              setActive(false)
          }
        }}
      ></div>
      <div className={`container ${!active ? '' : 'burgerActive' }`}>
        <h1 className="headerLogo">
          The Movie TV
        </h1>
        <ul className="headerItems">
          <li className="headerItem">
            <Link
              to="/"
              className="headerLink"
            >
              Популярные
            </Link>
          </li>
          <li className="headerItem">
            <Link
              to="/saved"
              className="headerLink"
              onClick={() => {
                setClick(true);
              }}
            >
              Избранное
            </Link>
          </li>
        </ul>
        <form className="headerForm" onSubmit={formHandler}>
          <label>
            <input
              className="searchInput"
              placeholder="Поиск фильма"
              onChange={(e) => setSeachItem(e.target.value)}
            />
          </label>
          <button>
            <FiSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
