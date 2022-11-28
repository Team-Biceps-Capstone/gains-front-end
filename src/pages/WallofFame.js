import React, { Component } from "react";
import "../css/Challenge.css";
import axios, { HttpStatusCode } from "axios";

export default class WallofFame extends Component {
  constructor() {
    super();
    this.state = {
      viewWOF: [], 
      userId: JSON.parse(window.localStorage.getItem("user"))._id
    };
    
    this.viewDisplayChallenge = this.viewDisplayChallenge.bind(this); 

  }

  componentDidMount() {
    this.viewDisplayChallenge();
  }

  viewDisplayChallenge = () => {
    axios
      .get(`api/user/viewWOF/${this.state.userId}`)
      .then((res) => {
        const viewWOF = res.data;
        console.log(viewWOF);
        this.setState({ viewWOF});
      });
  };

  removeWOF = (challengeID) => {
    if (challengeID){
    axios
      .delete(`/api/user/${challengeID}/removeWOF/${this.state.userId}`)
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
                {
                JSON.stringify(json.badge) === JSON.stringify("team") && 
                <div>
                <div className="badge-won1">
                  <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668114964/badges/highfive_xkqayd.png'/>
                </div>
                <div> <br/>
                    <h4>{json.badge}<br/></h4>
                    <h6>"Complete a challenge with a partner"</h6>
                  </div>
                </div>
                }

                {
                JSON.stringify(json.badge) === JSON.stringify("rain") && 
                <div>
                <div className="badge-won2">
                  <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668116867/badges/umbrella_ohxeho.png'/>
                </div>
                <div> <br/>
                    <h4>{json.badge} <br/></h4>
                    <h6>"Complete a challenge in the rain"</h6>
                  </div>
                </div>
                }
                
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
                <button className="general-button3" onClick={(e) => this.removeWOF(json._id, e)}>Re-join</button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

