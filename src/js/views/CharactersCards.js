import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const CharacterCards = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const startCharacters = () => {
      actions.getCharactersCards();
    };
    startCharacters();
    }, []);

  return (
    <div className="d-flex overflow-auto">
      {store.characterscards && store.characterscards.length > 0 ? (
        store.characterscards.map((item, index) => {
          const details = store.detailedCharacters[item.uid] || {};
          return (
            <div
              key={index}
              className="card me-3 imgFlex"
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
                    className="mt-4 btn btn-outline-primary"
                  >
                    Learn more!
                  </Link>
                  <i
                    className="btn btn-outline-warning mt-4 far fa-heart iconFont"
                    onClick={() => actions.addFavoriteItem(item.name)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div className="cardStarWars">
            <div className="loaderStarWars">
              <p>loading</p>
              <div className="wordsStarWars">
                <span className="wordStarWars">May the Force be with you.</span>
                <span className="wordStarWars">I've got a bad feeling about this</span>
                <span className="wordStarWars">Patience, young padawan.</span>
                <span className="wordStarWars">It's a trap.</span>
                <span className="wordStarWars">May the Force be with you</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCards;
