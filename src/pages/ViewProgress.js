import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";

export default class ViewProgress extends Component {
  constructor() {
    super();
    this.state = {
      viewProgress: [], 
      userId: JSON.parse(window.localStorage.getItem("user"))._id
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
    let Bearertoken = JSON.parse(window.localStorage.getItem("user")).token;
    axios
      .get(`api/user/view`, {
        headers: {
          Authorization: `Bearer ${Bearertoken}`,
        },
      })
      .then((res) => {
        const viewProgress = res.data;
        console.log(viewProgress);
        this.setState({ viewProgress});
      });
  };

  updateFavorites = (challengeID) => {
    if (challengeID){
    axios
      .put(`/challenge/${challengeID}/favorite/${this.state.userId}`)
      .then((res) => {
        console.log('added')
        window.location.reload(false)
      })
  }
}

  updateUnfavorites = (challengeID) => {
    if (challengeID){
    axios
      .put(`/challenge/${challengeID}/unfavorite/${this.state.userId}`)
      .then((res) => {
        console.log('unadded')
        window.location.reload(false)
      })
  }
}

completeChallenge = (challengeID) => {
  if (challengeID){
  axios 
    .put(`/api/user/${challengeID}/addWOF/${this.state.userId}`)
    .then((res) => {
      console.log('added to wall of fame')
    })

  axios
    .delete(`/api/user/${challengeID}/deleteProgress/${this.state.userId}`)
    .then((res) => {
      window.location.reload(false)
    })
    
}
}


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
                width: "60%",
                height: "700px",
              }}
            >
              <div>
                <p>Image</p>
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

              <div>
              <div>
                {JSON.stringify(this.state.userId) === JSON.stringify(json.favoritedBy.filter((val) => val.includes(`${this.state.userId}`))[0])
                ? <button className="general-button" onClick={(e) => this.updateUnfavorites(json._id, e)}>Unfavorite</button>
                : <button className="general-button" onClick={(e) => this.updateFavorites(json._id, e)}>Favorite</button>
                }
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
                <button className="general-button" onClick={(e) => this.completeChallenge(json._id, e)}>Complete Challenge</button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
