import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";


export default class ViewChallenges extends Component {
  constructor() {
    super();
    this.state = {
      viewProgress: [],
      viewinprogressarray: [],
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
          window.location.reload(false)
        });
    }
  };

  removeProgress = (challengeID) => {
    if (challengeID) {
      axios
        .delete(`api/user/${challengeID}/deleteProgress/${this.state.userId}`)
        .then((res) => {
          console.log("removed progress");
          window.location.reload(false)
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
        let viewinprogressarray = []
        let len = res.data.length

        for (let i = 0; i < len; i++ ){
          viewinprogressarray.push(res.data[i]._id)
        }
        this.setState({ viewinprogressarray});
      });
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
           
                {
                JSON.stringify(json.badge) === JSON.stringify("team") && 
                <div>
                  <div className="badge-pending">
                    <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668114964/badges/highfive_xkqayd.png'/>
                  </div>
                  <div>
                    <h5>{json.badge}<br/></h5>
                    <p>"Complete a challenge with a partner"</p>
                  </div>
                </div>
                }

                {
                JSON.stringify(json.badge) === JSON.stringify("rain") && 
                <div>
                  <div className="badge-pending">
                    <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668116867/badges/umbrella_ohxeho.png'/>
                  </div>
                  <div>
                    <h5>{json.badge}<br/></h5>
                    <p>"Complete a challenge in the rain"</p>
                  </div>
                </div>
                }

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
                  {JSON.stringify(this.state.viewinprogressarray.includes(json._id)) === 'true'
                  ? (
                    <button
                      className="general-button"
                      onClick={(e) => this.removeProgress(json._id, e)}
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      className="general-button"
                      onClick={(e) => this.addToProgress(json._id, e)}
                    >
                      {" "}
                      Join {" "}
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
