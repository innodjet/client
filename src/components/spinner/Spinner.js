import React from "react";
import "./Spinner.scss";

const Spinner = () => (
  <div className="spinner spinner-container">
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only"></span>
    </div>
    <div className="spinner-grow text-danger" role="status">
      <span className="sr-only"></span>
    </div>
    <div className="spinner-grow text-dark" role="status">
      <span className="sr-only"></span>
    </div>
    <div className="spinner-grow text-warning" role="status">
      <span className="sr-only"></span>
    </div>
  </div>
);

export default Spinner;
