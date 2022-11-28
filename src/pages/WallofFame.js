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
                <div className="badge-won1">
                  <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668114964/badges/highfive_xkqayd.png'/>
                </div>
                }

                {
                JSON.stringify(json.badge) === JSON.stringify("rain") && 
                <div className="badge-won2">
                  <img src = 'https://res.cloudinary.com/dknbyexun/image/upload/v1668116867/badges/umbrella_ohxeho.png'/>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

