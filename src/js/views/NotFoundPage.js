import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";


const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center py-5">
      <div className="text-center">
        <div className="display-1 font-weight-bold text-light">404</div>
        <div>
        <p className="h4 text-secondary mb-4 animate-charcter">
          Oops! The page you are looking for might be hiding in a galaxy far, far away...
        </p>
        </div>
        <div>
        <button onClick={() => navigate("/")} className="bookmarkBtn">
          Go Home
        </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;