import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/navbar.css";
import logoStarWars from "../../img/logosw.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);



    return (
        <nav className="navbar navbar-dark sticky-top bg-dark py-3">
            <div className="container-fluid d-flex">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link to="/">
                        <img src={logoStarWars} alt="Star Wars" style={{ width: '120px' }} />
                    </Link>
                    <div className="dropdown">
                        <button
                            className="navbarButton btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Favorites ({store.favoriteStore ? store.favoriteStore.length : 0})
                        </button>
                        <ul className="dropdown-menu justify-content-between">
                            {store.favoriteStore && store.favoriteStore.length > 0 ? (
                                store.favoriteStore.map((item, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item">{item}</a><i class="fas fa-trash-alt"></i>
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
