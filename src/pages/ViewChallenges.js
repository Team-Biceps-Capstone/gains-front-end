import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";
import { Link } from "react-router-dom";

export default class ViewChallenges extends Component {
  constructor() {
    super();
    this.state = {
      viewProgress: [],
      viewinprogressarray: [],
      viewCompleted: [],
      userId: JSON.parse(window.localStorage.getItem("user"))._id,
    };

    this.viewDisplayChallenge = this.viewDisplayChallenge.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateUnfavorites = this.updateUnfavorites.bind(this);
    this.viewInProgress = this.viewInProgress.bind(this);
  }

  componentDidMount() {
    this.viewDisplayChallenge();
    this.updateFavorites();
    this.updateUnfavorites();
    this.viewInProgress();
    this.getCompletedChallenges();
  }

  viewDisplayChallenge = () => {
    axios.get(`challenge/${this.state.userId}/myChallenges`).then((res) => {
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
          this.componentDidMount();
        });
    }
  };

  updateUnfavorites = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/challenge/${challengeID}/unfavorite/${this.state.userId}`)
        .then((res) => {
          console.log("unadded");
          this.componentDidMount();
        });
    }
  };

  addToProgress = (challengeID) => {
    if (challengeID) {
      axios
        .put(`/api/user/${challengeID}/addProgress/${this.state.userId}`)
        .then((res) => {
          console.log("added challenge to progress");
          this.componentDidMount();
        });
    }
  };

  removeProgress = (challengeID) => {
    if (challengeID) {
      axios
        .delete(`api/user/${challengeID}/deleteProgress/${this.state.userId}`)
        .then((res) => {
          console.log("removed progress");
          this.componentDidMount();
        });
    }
  };

  viewInProgress = () => {
    let Bearertoken = JSON.parse(window.localStorage.getItem("user")).token;
    axios
      .get(`api/user/view`, {
        headers: {
          Authorization: `Bearer ${Bearertoken}`,
        },
      })
      .then((res) => {
        let viewinprogressarray = [];
        let len = res.data.length;

        for (let i = 0; i < len; i++) {
          viewinprogressarray.push(res.data[i]._id);
        }
        this.setState({ viewinprogressarray });
      });
  };

  getCompletedChallenges = () => {
    let Bearertoken = JSON.parse(window.localStorage.getItem("user")).token;
    axios
      .get(`api/user/completed`, {
        headers: {
          Authorization: `Bearer ${Bearertoken}`,
        },
      })
      .then((res) => {
        const viewCompleted = res.data;
        console.log(viewCompleted);
        this.setState({ viewCompleted });
      });
  };

  render() {
    return (
      <div className="challenge">
        <div>
          <Link to="/challenge">
            <button className="general-button">Back to Challenges</button>
          </Link>
          <Link to="/viewChallenges">
            <button className="general-button">My Created Challenges</button>
          </Link>
          <Link to="/viewProgress">
            <button className="general-button">My Progress</button>
          </Link>
          <Link to="/walloffame">
            <button className="general-button">Wall of Fame</button>
          </Link>
          <br />
          <br />

          {this.state.viewProgress.map((json, index) => (
            <div
              key={json._id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "60%",
                height: "700px",
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
                <div>
                  <div>
                    {JSON.stringify(json.badge) === JSON.stringify("team") && (
                      <div>
                        <div className="badge-pending">
                          <img src="https://res.cloudinary.com/dknbyexun/image/upload/v1668114964/badges/highfive_xkqayd.png" />
                        </div>
                        <div>
                          <h5>
                            {json.badge}
                            <br />
                          </h5>
                          <p>"Complete a challenge with a partner"</p>
                        </div>
                      </div>
                    )}

                    {JSON.stringify(json.badge) === JSON.stringify("rain") && (
                      <div>
                        <div className="badge-pending">
                          <img src="https://res.cloudinary.com/dknbyexun/image/upload/v1668116867/badges/umbrella_ohxeho.png" />
                        </div>
                        <div>
                          <h5>
                            {json.badge}
                            <br />
                          </h5>
                          <p>"Complete a challenge in the rain"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                  {this.state.viewCompleted.find((e) => e._id === json._id) ? (
                    <button className="general-button nohover">Done</button>
                  ) : JSON.stringify(
                      this.state.viewinprogressarray.includes(json._id)
                    ) === "true" ? (
                    <button
                      className="general-button2"
                      onClick={(e) => this.removeProgress(json._id, e)}
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      className="general-button3"
                      onClick={(e) => this.addToProgress(json._id, e)}
                    >
                      {" "}
                      Join{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
