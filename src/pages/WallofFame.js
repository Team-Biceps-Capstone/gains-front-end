import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";

export default class WallofFame extends Component {
  constructor() {
    super();
    this.state = {
      viewWOF: [],
      userBadges: [],
      userId: JSON.parse(window.localStorage.getItem("user"))._id,
    };

    this.viewDisplayChallenge = this.viewDisplayChallenge.bind(this);
  }

  componentDidMount() {
    this.viewDisplayChallenge();
    this.getUserBadges();
  }

  getUserBadges = () => {
    axios.get(`api/user/badges/${this.state.userId}`).then((res) => {
      const userBadges = res.data;
      console.log(userBadges);
      this.setState({ userBadges });
    });
  };

  viewDisplayChallenge = () => {
    axios.get(`api/user/viewWOF/${this.state.userId}`).then((res) => {
      const viewWOF = res.data;
      console.log(viewWOF);
      this.setState({ viewWOF });
    });
  };

  removeWOF = (challengeID) => {
    if (challengeID) {
      axios
        .delete(`/api/user/${challengeID}/removeWOF/${this.state.userId}`)
        .then((res) => {
          window.location.reload(false);
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
          <button
            className="general-button"
            onClick={(event) => (window.location.href = "/viewChallenges")}
          >
            My Created Challenges
          </button>
          <button
            className="general-button"
            onClick={(event) => (window.location.href = "/viewProgress")}
          >
            My Challenges in Progress
          </button>
          <button
            className="general-button"
            onClick={(event) => (window.location.href = "/walloffame")}
          >
            Wall of Fame
          </button>
          <br />
          <h4
            style={{
              marginLeft: "10px",
            }}
          >
            User Badges
          </h4>

          {this.state.userBadges.length === 0 ? (
            <div
              style={{
                marginLeft: "10px",
              }}
            >
              No Badges Acquired
            </div>
          ) : (
            this.state.userBadges.map((json) => (
              <div
                key={json._id}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  marginLeft: "5%",
                  width: "90%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    src={json.image}
                    alt={json.name}
                  ></img>
                  <div>{json.description}</div>
                </div>
              </div>
            ))
          )}
          <br />
          <h4
            style={{
              marginLeft: "10px",
            }}
          >
            Completed Challenges
          </h4>

          {this.state.viewWOF.map((json) => (
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
                  {JSON.stringify(json.badge) === JSON.stringify("team") && (
                    <div className="badge-won1">
                      <img src="https://res.cloudinary.com/dknbyexun/image/upload/v1668114964/badges/highfive_xkqayd.png" />
                    </div>
                  )}

                  {JSON.stringify(json.badge) === JSON.stringify("rain") && (
                    <div className="badge-won2">
                      <img src="https://res.cloudinary.com/dknbyexun/image/upload/v1668116867/badges/umbrella_ohxeho.png" />
                    </div>
                  )}
                </div>
              </div>

              <div>
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
                    className="general-button3"
                    onClick={(e) => this.removeWOF(json._id, e)}
                  >
                    Re-join
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
