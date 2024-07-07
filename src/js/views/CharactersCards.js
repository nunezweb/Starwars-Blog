import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterCards = () => {
  const { store, actions } = useContext(Context);

  const handleLearnMoreClick = (uid) => {
    actions.getStoreClicUid(uid);
  };

  return (
    <div className="d-flex overflow-auto">
      {store.characterscards && store.characterscards.length > 0 ? (
        store.characterscards.map((item, index) => {
          const details = store.detailedCharacters[item.uid] || {};
          console.log("Constante details:", store.gender);
          return (
            <div
              key={index}
              className="card me-3"
              style={{ minWidth: "300px" }}
            >
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
                className="card-img-top"
                alt="Star Wars"
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="mb-0">Gender: {details.gender}</p>
                <p className="mb-0">Hair-Color: {details.hair_color}</p>
                <p className="mb-0">Eye-Color: {details.eye_color}</p>
                <div className="d-flex justify-content-between">
                  <Link
                    to={`/characterdetails/${item.uid}`}
                    onClick={() => handleLearnMoreClick(item.uid)}
                    className="mt-4 btn btn-outline-primary"
                  >
                    Learn more!
                  </Link>
                  <i
                    className="btn btn-outline-warning mt-4 far fa-heart"
                    onClick={() => actions.favorite(item.name)}
                    style={{ fontSize: "22px" }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div class="loader">
            <p class="text">
              <span class="letter letter1">L</span>
              <span class="letter letter2">o</span>
              <span class="letter letter3">a</span>
              <span class="letter letter4">d</span>
              <span class="letter letter5">i</span>
              <span class="letter letter6">n</span>
              <span class="letter letter7">g</span>
              <span class="letter letter8">.</span>
              <span class="letter letter9">.</span>
              <span class="letter letter10">.</span>
            </p>
          </div>
          <p className="text-white">No characters available</p>
        </div>
      )}
    </div>
  );
};

export default CharacterCards;
