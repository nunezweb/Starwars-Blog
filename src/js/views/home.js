import React from "react";
import "../../styles/home.css";
import CharacterCards from "./CharactersCards";
import StarshipsCards from "./StarshipsCards";

export const Home = () => (
  <div>
    <div className="container mt-5">
      <h1 className=" text-danger m-5">Characters</h1>
      <div className="row justify-content-end">
        <div className="col-12">
          <div
            className="d-flex overflow-auto mb-5 containersCss"
          >
            <CharacterCards />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
    <div className="container mt-5">
      <h1 className=" text-danger m-5">Startships</h1>
      <div className="row justify-content-end">
        <div className="col-12">
          <div
            className="d-flex overflow-auto mb-5 containersCss"
          >
            <StarshipsCards />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  </div>
);