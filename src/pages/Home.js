import React, { Component } from "react";
import "../css/Home.css";
import run from "../images/run.jpg";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <img
          className="home-image"
          src={run}
          alt="Oregon State University"
          loading="lazy"
        ></img>
        <div className="home-message">
          <strong>Let the games begin!</strong>
          <br></br>
          <br></br>
          {!this.props.user ? (
            <>
              <Link to="/login">
                <button className="general-button">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="general-button">Sign Up</button>
              </Link>
              <Link to="/about">
                <button className="general-button">Our Story</button>
              </Link>
            </>
          ) : (
            <Link to="/challenge">
              <button className="general-button">Grind Time</button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
