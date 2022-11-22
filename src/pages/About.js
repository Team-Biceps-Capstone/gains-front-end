import React, { Component } from "react";
import "../css/About.css";
import osu from "../images/osu.jpg";

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <img
          className="about-image"
          src={osu}
          alt="Oregon State University"
          loading="lazy"
        ></img>

        <div className="about-message">
          <strong className="about-center">Welcome! </strong>
          <br></br>
          <br></br>
          We are Team Bicep, a group of Computer Science students from Oregon
          State University completing a crowd-sourced fitness app for their
          capstone project.
        </div>
      </div>
    );
  }
}
