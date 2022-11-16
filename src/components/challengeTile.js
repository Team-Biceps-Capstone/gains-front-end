import React, { Component } from "react";
import { AiFillHeart } from "react-icons/ai";

export default class ChallengeTile extends Component {
  constructor() {
    super();
    this.state = {};

    this.handleUserFavorite = this.handleUserFavorite.bind(this);
    this.handleOpenTile = this.handleOpenTile.bind(this);
  }

  handleUserFavorite(event, name) {
    event.stopPropagation();
    console.log("User favorite :" + name);
  }

  handleOpenTile(name) {
    console.log("Open Challenge: " + name);
  }

  render() {
    return (
      <div
        onClick={() => this.handleOpenTile(this.props.json.name)}
        className="challenge-tile"
      >
        <div
          className="challenge-tile-favorites"
          onClick={(e) => this.handleUserFavorite(e, this.props.json.name)}
        >
          <AiFillHeart />
          <div>&nbsp;</div>
          <div>{this.props.json.favorites}</div>
        </div>
        <img
          alt="challengeImage"
          src={this.props.json.image}
          className="challenge-tile-image"
        ></img>
        <div className="challenge-tile-description">
          <div>
            <strong>{this.props.json.name}</strong>
          </div>
          <div>{this.props.json.challenge}</div>
          tags: {this.props.json.tags.map((tag) => "#" + tag + " ")}
        </div>
      </div>
    );
  }
}
