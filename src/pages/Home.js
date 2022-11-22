import React, { Component } from "react";
import "../css/Home.css";
import run from "../images/run.jpg";

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
              <button
                onClick={(event) => (window.location.href = "/login")}
                className="general-button"
              >
                Log In
              </button>
              <button
                onClick={(event) => (window.location.href = "/signup")}
                className="general-button"
              >
                Sign Up
              </button>
              <button
                onClick={(event) => (window.location.href = "/about")}
                className="general-button"
              >
                Our Story
              </button>{" "}
            </>
          ) : (
            <button
              onClick={(event) => (window.location.href = "/challenge")}
              className="general-button"
            >
              Grind Time!
            </button>
          )}
        </div>
      </div>
    );
  }
}
