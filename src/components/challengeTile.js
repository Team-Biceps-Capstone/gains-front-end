import React, { Component } from "react";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";

export default class ChallengeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: this.props.json.favorites,
      userId: JSON.parse(window.localStorage.getItem("user"))._id,
    };

    this.handleUserFavorite = this.handleUserFavorite.bind(this);
    this.addToProgress = this.addToProgress.bind(this);
    this.deleteFromProgress = this.deleteFromProgress.bind(this);
  }

  componentDidMount() {}

  handleUserFavorite(event, name, challengeID) {
    event.stopPropagation();

    //favorite on click
    axios
      .put(`/challenge/${challengeID}/favorite/${this.state.userId}`)
      .then((res) => {
        console.log("added", res.data);

        //unfavorite on click
        if (res.data === "User has already favorited") {
          axios
            .put(`/challenge/${challengeID}/unfavorite/${this.state.userId}`)
            .then((res) => {
              console.log("unadded", res.data.favorites);
              this.setState({ favorite: `${res.data.favorites - 1}` });
            });
        } else {
          console.log("added");
          this.setState({ favorite: `${res.data.favorites + 1}` });
        }
      });

    console.log("User favorite :" + name);
  }

  addToProgress = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/api/user/${challengeID}/addProgress/${this.state.userId}`)
        .then((res) => {
          this.props.addViewProgress(this.props.json);
        });
    }
  };

  deleteFromProgress = (challengeID) => {
    if (challengeID) {
      axios
        .delete(`/api/user/${challengeID}/deleteProgress/${this.state.userId}`)
        .then((res) => {
          this.props.removeViewProgress(challengeID);
        });
    }
  };

  render() {
    return (
      <div className="challenge-tile">
        <div
          className="challenge-tile-favorites"
          onClick={(e) =>
            this.handleUserFavorite(
              e,
              this.props.json.name,
              this.props.json._id
            )
          }
        >
          <AiFillHeart />
          <div>&nbsp;</div>
          <div>{this.state.favorite}</div>
        </div>

        {this.props.viewCompleted.find((e) => e._id === this.props.json._id) ? (
          <div className="challenge-tile-participate nohover">Done</div>
        ) : this.props.viewProgress.find(
            (e) => e._id === this.props.json._id
          ) ? (
          <div
            className="challenge-tile-participate"
            onClick={(e) => this.deleteFromProgress(this.props.json._id, e)}
          >
            Leave
          </div>
        ) : (
          <div
            className="challenge-tile-participate"
            onClick={(e) => this.addToProgress(this.props.json._id, e)}
          >
            Join
          </div>
        )}

        <img
          alt="challengeImage"
          src={this.props.json.image}
          className="challenge-tile-image"
        ></img>
        <div className="challenge-tile-description">
          <div className="overflow">
            <strong className="overflow">{this.props.json.name}</strong>
          </div>
          <div className="overflow">{this.props.json.challenge}</div>
          <div className="overflow">
            tags: {this.props.json.tags.map((tag) => "#" + tag + " ")}
          </div>
        </div>
      </div>
    );
  }
}
