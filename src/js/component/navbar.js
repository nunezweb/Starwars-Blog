import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/navbar.css";
import logoStarWars from "../../img/logosw.png";
import { Context } from "../store/appContext";
import Autocomplete from "../component/Autocomplete";

export const Home = () => {
  const { store, actions } = useContext(Context);
};

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark py-3">
      <div className="container-fluid d-flex">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link to="/">
            <img className="logo" src={logoStarWars} alt="Star Wars" />
          </Link>
            <div className="d-flex justify-content-center w-100">
              <Autocomplete />
            </div>
          <div className="dropdown">
            <button
              className="navbarButton btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites ({store.favoriteStore.length})
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {store.favoriteStore.length > 0 ? (
                store.favoriteStore.map((item, index) => (
                  <li key={index}>
                    <a className="dropdown-item dropdownItem">
                      {item}
                      <i
                        className="fas fa-trash-alt"
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.deleteFavoriteItem(item);
                        }}
                      ></i>
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a className="dropdown-item">Empty</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
