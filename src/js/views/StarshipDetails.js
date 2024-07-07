import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/details.css";

const StarshipDetails = () => {
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <img
              src="https://picsum.photos/800/600"
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <h1>A-wing Fighter</h1>
            <p>
              With its sleek arrowhead shape, streamlined cockpit, and massive
              twin engines, the A-wing starfighter suggests raw speed even when
              parked within Alliance hangar bays. Faster than even the TIE
              interceptor, the A-wing is well suited for lightning strikes. It
              sports a pair of pivoting laser cannons on each wingtip. The
              starfighters of Green Squadron, which flew in the Battle of Endor,
              were made up of A-wing starfighters. The A-wing continued to
              evolve, and was part of the Resistance’s starfighter corps during
              its fight against the First Order
            </p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <hr className="separator-red" />
        <div className="row text-center text-danger">
          <div className="col-2">
            <h2 className="fs-3">Name</h2>
            <p className="fs-5">Luke</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Birth Year</h2>
            <p className="fs-5">35</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Gender</h2>
            <p className="fs-5">Male</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Height</h2>
            <p className="fs-5">10"</p>
          </div>
          <div className="col-2">
            <h2 className="fs-3">Skin Color</h2>
            <p className="fs-5">Brown</p>
          </div>
          <div className="col-2">
            <h2 className=" fs-3">Eye Color</h2>
            <p className="fs-5">Brown</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetails;
