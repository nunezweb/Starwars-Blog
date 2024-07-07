import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const StarshipsCards = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex overflow-auto">
            {store.starshipscards && store.starshipscards.length > 0 ? (
                store.starshipscards.map((item, index) => {
                    const details = store.detailedStarships[item.uid] || {};
                    console.log("Constante details:", store.gender)
                    return (
                        <div key={index} className="card me-3" style={{ minWidth: '300px' }}>
                            <img src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="mb-0">Model: {details.model}</p>
                            <p className="mb-0">Class: {details.starship_class}</p>
                            <p className="mb-0">Passengers: {details.passengers}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/starshipdetails/${item.uid}`} className="mt-4 btn btn-outline-primary">
                                        Learn more!
                                    </Link>
                                    <i className="btn btn-outline-warning mt-4 far fa-heart" onClick={() => actions.favorite(item.name)} style={{ fontSize: "22px" }}></i>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No characters available</p>
            )}
        </div>
    );
};

export default StarshipsCards;
