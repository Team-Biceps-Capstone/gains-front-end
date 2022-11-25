import React, { Component } from "react";
import axios from "axios";
import { AiFillAmazonCircle, AiFillFileMarkdown, AiFillHeart, AiFillPlusSquare } from "react-icons/ai";

export default class ChallengeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.json.favorites,
      userId: JSON.parse(window.localStorage.getItem("user"))._id,
    };

    this.handleUserFavorite = this.handleUserFavorite.bind(this);
    this.handleOpenTile = this.handleOpenTile.bind(this);
  }

  handleUserFavorite(event, name, challengeID) {
    event.stopPropagation();
    
    //favorite on click
    axios
    .put(`/challenge/${challengeID}/favorite/${this.state.userId}`)
    .then((res) => {
      console.log("added", res.data);
      
      //unfavorite on click
      if (res.data === 'User has already favorited'){
        axios
        .put(`/challenge/${challengeID}/unfavorite/${this.state.userId}`)
        .then((res) => {
          console.log("unadded", res.data.favorites);
          this.setState({favorite:`${res.data.favorites-1}`})   
        });
      } else { 
        console.log("added")
        this.setState({favorite:`${res.data.favorites+1}`})  
      }
    });

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
          onClick={(e) => this.handleUserFavorite(e, this.props.json.name, this.props.json._id)}
        >
          <AiFillHeart />
          <div>&nbsp;</div>
          <div>{this.state.favorite}</div>
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