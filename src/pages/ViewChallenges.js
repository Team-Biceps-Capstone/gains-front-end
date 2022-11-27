import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";

export default class ViewChallenges extends Component {
  constructor() {
    super();
    this.state = {
      viewProgress: [],
      userId: JSON.parse(window.localStorage.getItem("user"))._id,
    };

    this.viewDisplayChallenge = this.viewDisplayChallenge.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateUnfavorites = this.updateUnfavorites.bind(this);
  }

  componentDidMount() {
    this.viewDisplayChallenge();
    this.updateFavorites();
    this.updateUnfavorites();
  }

  viewDisplayChallenge = () => {
    axios
    .get(`challenge/${this.state.userId}/myChallenges`)
    .then((res) => {
      const viewProgress = res.data;
      this.setState({ viewProgress });
    });
  };

  updateFavorites = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/challenge/${challengeID}/favorite/${this.state.userId}`)
        .then((res) => {
          console.log("added");
          window.location.reload(false);
        });
    }
  };

  updateUnfavorites = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/challenge/${challengeID}/unfavorite/${this.state.userId}`)
        .then((res) => {
          console.log("unadded");
          window.location.reload(false);
        });
    }
  };

  addToProgress = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/api/user/${challengeID}/addProgress/${this.state.userId}`)
        .then((res) => {
          console.log("added challenge to progress");
        });
    }
  };

  render() {
    return (
      <div className="challenge">
        <div>
          <button
            className="general-button"
            onClick={(event) => (window.location.href = "/challenge")}
          >
            Back to Challenges
          </button>
          <br />
          <br />
          {this.state.viewProgress.map((json) => (
            <div
              key={json._id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "70%",
                height: "500px",
              }}
            >
              <div>
                <img
                  style={{
                    height: "300px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                  alt="challenge"
                  src={json.image}
                />
                <p>Badge</p>
                <p>{json.badges}</p>
              </div>

              <div>
                <div>
                  {JSON.stringify(this.state.userId) ===
                  JSON.stringify(
                    json.favoritedBy.filter((val) =>
                      val.includes(`${this.state.userId}`)
                    )[0]
                  ) ? (
                    <button
                      className="general-button"
                      onClick={(e) => this.updateUnfavorites(json._id, e)}
                    >
                      Unfavorite
                    </button>
                  ) : (
                    <button
                      className="general-button"
                      onClick={(e) => this.updateFavorites(json._id, e)}
                    >
                      {" "}
                      Favorite{" "}
                    </button>
                  )}
                </div>


                <p>Name: {json.name}</p>

                <p>Challenge: {json.challenge}</p>

                <p>
                  {" "}
                  Tags:
                  {json.tags.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </p>

                <p>Description: {json.description} </p>

                <p>
                  {" "}
                  Goals:
                  {json.goals.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </p>

                <div>
                <button
                      className="general-button"
                      onClick={(e) => this.addToProgress(json._id, e)}
                    >
                      Add
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
