import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const StarshipDetails = () => {
  const { store } = useContext(Context);
  const [starshipDetails, setStarshipDetails] = useState(null);
  const [starshipDescription, setStarshipDescription] = useState(null);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchStarshipDetails = async (uid) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`${store.apiUrl}/starships/${uid}`);
        const data = await response.json();
        if (response.ok) {
          setStarshipDetails(data.result.properties);
          setStarshipDescription(data.result.description);
          setError(false); // es false
        } else {
          console.error("Error fetching starship details:", data.message);
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching starship details:", error);
        setError(true);
      }
    };

    if (params.uid) {
      fetchStarshipDetails(params.uid);
    }
  }, [params.uid, store.apiUrl]);

  if (error) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-6r text-white">
            <h1>Error loading data</h1>
            <button
              className="bookmarkBtn mt-3"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!starshipDetails) {
    return (
      <div className="container py-5 my-5">
        <div className="row align-items-center">
          <div className="spinnerContainer">
            <div className="spinner"></div>
            <div className="loader">
              <p>loading</p>
              <div className="words">
                <span className="word">May the Force be with you.</span>
                <span className="word">I've got a bad feeling about this</span>
                <span className="word">Patience, young padawan.</span>
                <span className="word">It's a trap.</span>
                <span className="word">May the Force be with you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${params.uid}.jpg`}
              className="card-img-top"
              alt="Star Wars"
            />
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-white">{starshipDetails.name}</h1>
            <p className="text-white">{starshipDescription}</p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <hr className="separator-red" />
        <div className="row text-center text-danger">
          <div className="col-2">
            <h2 className="fs-3">Model</h2>
            <p className="fs-5">{starshipDetails.model}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Manufacturer</h2>
            <p className="fs-5">{starshipDetails.manufacturer}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Length</h2>
            <p className="fs-5">{starshipDetails.length}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Passengers</h2>
            <p className="fs-5">{starshipDetails.passengers}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Atmosphering Speed</h2>
            <p className="fs-5">{starshipDetails.max_atmosphering_speed}</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Cargo Capacity</h2>
            <p className="fs-5">{starshipDetails.cargo_capacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetails;
