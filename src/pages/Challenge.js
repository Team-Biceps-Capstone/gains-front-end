import React, { Component } from "react";
import "../css/Challenge.css";
import Modal from "react-modal";
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import axios from "axios";
import UploadWidget from "../components/uploadWidget";
import ChallengeTile from "../components/challengeTile";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const noneBadge = {
  name: "none",
  image: null,
  description: null,
};

export default class Challenge extends Component {
  constructor() {
    super();
    this.state = {
      userID: "",
      showModal: false,
      challengeTitle: "",
      challengeDescription: "",
      challengeTags: "",
      challengeGoals: [],
      challengeImageId: "",
      challengeImage: "",
      challengeThumbnail: "",
      badge: noneBadge,
      createdBy: "",
      constantBadges: [],
      constantChallenges: [],
      displayChallenges: null,
      originalDisplayChallenges: null,
      searchBar: "",
      viewProgress: [],
      viewCompleted: [],
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSetImage = this.handleSetImage.bind(this);
    this.handleFilterBySearch = this.handleFilterBySearch.bind(this);
    this.handleClearSearchBar = this.handleClearSearchBar.bind(this);
    this.handleUserFavorite = this.handleUserFavorite.bind(this);
    this.getDisplayChallenge = this.getDisplayChallenge.bind(this);
    this.getConstantChallenges = this.getConstantChallenges.bind(this);
    this.getInProgressChallenges = this.getInProgressChallenges.bind(this);
    this.addViewProgress = this.addViewProgress.bind(this);
  }

  componentDidMount() {
    this.getConstantChallenges();
    this.getConstantBadges();
    this.getDisplayChallenge();
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    this.setState({ userID });
    this.getInProgressChallenges();
    this.getCompletedChallenges();
  }

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

  getInProgressChallenges = () => {
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
        this.setState({ viewProgress });
      });
  };

  addViewProgress = (challengeObj) => {
    console.log(challengeObj);
    this.setState({ viewProgress: [...this.state.viewProgress, challengeObj] });
  };

  removeViewProgress = (challengeID) => {
    this.setState({
      viewProgress: this.state.viewProgress.filter(function (challenge) {
        return challengeID !== challenge._id;
      }),
    });
  };

  getConstantChallenges = () => {
    axios.post(`/constant`, { name: "challenges" }).then((res) => {
      const constantChallenges = res.data.items;
      this.setState({ constantChallenges });
    });
  };

  getConstantBadges = () => {
    axios.post(`/constant`, { name: "badges" }).then((res) => {
      const constantBadges = res.data.items;
      this.setState({ constantBadges });
    });
  };

  getDisplayChallenge = () => {
    axios.get(`/challenge/display`).then((res) => {
      const displayChallenges = res.data.reverse();
      this.setState({
        displayChallenges,
        originalDisplayChallenges: displayChallenges,
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newTags = this.state.challengeTags
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .toLowerCase();
    const req = {
      name: this.state.challengeTitle,
      description: this.state.challengeDescription,
      tags: newTags.trim().split(" "),
      challenge: document.getElementById("challenges").value,
      goals: this.state.challengeGoals,
      image: this.state.challengeImage,
      badge: this.state.badge.name,
      createdBy: this.state.userID,
    };

    axios.post(`/challenge`, req).then((res) => {
      this.handleCloseModal(true);
      this.getDisplayChallenge();
      console.log(res);
      console.log(res.data);
    });
  };

  handleTagsChange = (event) => {
    this.setState({ challengeTags: event.target.value });
  };

  handleTitleChange = (event) => {
    this.setState({ challengeTitle: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ challengeDescription: event.target.value });
  };

  handleGoalChange = (event, key) => {
    var newArray = [...this.state.challengeGoals];
    newArray[key] = event.target.value;
    this.setState({ challengeGoals: newArray });
  };

  removeFields = (index) => {
    let data = [...this.state.challengeGoals];
    data.splice(index, 1);
    this.setState({ challengeGoals: data });
  };

  addFields = () => {
    this.setState({ challengeGoals: [...this.state.challengeGoals, ""] });
  };

  handleOpenModal() {
    document.getElementById("myNav").style.zIndex = 0;
    this.setState({ showModal: true });
  }

  handleCloseModal(submit) {
    document.getElementById("myNav").style.zIndex = 1;
    this.setState({ showModal: false });
    this.handleClearForm(submit);
  }

  handleClearSearchBar() {
    this.setState({ searchBar: "" }, () => {
      this.handleFilterBySearch();
    });
  }

  handleClearForm(submit) {
    if (!submit) {
      this.deleteImage(this.state.challengeImageId);
    }
    this.setState({
      challengeTags: "",
      challengeTitle: "",
      challengeDescription: "",
      challengeGoals: [],
      badge: noneBadge,
      challengeImage: "",
      challengeThumbnail: "",
      challengeImageId: "",
      createdBy: "",
    });
    this.resetForms();
  }

  handleSetImage(imageURL, thumbnailURL, publicId) {
    this.setState({
      challengeImage: imageURL,
      challengeThumbnail: thumbnailURL,
      challengeImageId: publicId,
    });
  }

  handleSelectChange = (event) => {
    if (event.target.value === "none") {
      this.setState({
        badge: noneBadge,
      });
    } else {
      axios.post(`/badge`, { name: event.target.value }).then((res) => {
        const badge = res.data;
        this.setState({ badge });
      });
    }
  };

  resetForms() {
    const selectTags = document.getElementsByTagName("select");
    for (var i = 0; i < selectTags.length; i++) {
      selectTags[i].selectedIndex = 0;
    }
  }

  handleSearchBarChange = (event) => {
    this.setState({ searchBar: event.target.value });
  };

  handleUserFavorite() {
    const newDisplayChallenges = JSON.parse(
      JSON.stringify(this.state.originalDisplayChallenges)
    );
    this.setState({
      displayChallenges: newDisplayChallenges
        .sort((a, b) => b.favorites - a.favorites)
        .slice(0, 5),
    });
  }

  handleFilterBySearch() {
    const searchArray = this.state.searchBar
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .toLowerCase()
      .trim()
      .split(" ");

    if (searchArray.length === 1 && searchArray[0] === "") {
      this.setState({
        displayChallenges: this.state.originalDisplayChallenges,
      });
      return;
    }

    const newDisplayChallenges = this.state.originalDisplayChallenges.filter(
      function (challenge) {
        return searchArray.every((value) => {
          return challenge.tags.includes(value);
        });
      }
    );
    this.setState({ displayChallenges: newDisplayChallenges });
  }

  deleteImage(id) {
    console.log(id);
    axios.delete(`/cloudinary`, { data: { id: id } }).then((res) => {
      console.log(res);
    });
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      this.handleFilterBySearch();
    }
  };

  render() {
    return (
      <div className="challenge">
        <div className="challenge-button-box">
          <div>
            <input
              className="search-bar"
              value={this.state.searchBar}
              onChange={this.handleSearchBarChange}
              onKeyDown={this.handleKeyPress}
              placeholder="Search by tags..."
            ></input>
            <VscChromeClose
              style={{
                cursor: "pointer",
                marginLeft: "-40px",
                marginRight: "20px",
              }}
              onClick={this.handleClearSearchBar}
            />
            <button
              className="general-button"
              onClick={this.handleFilterBySearch}
            >
              <VscSearch />
            </button>
          </div>
          <div>
            <Link to="/viewChallenges">
              <button className="general-button">My Created Challenges</button>
            </Link>
            <Link to="/viewProgress">
              <button className="general-button">My Progress</button>
            </Link>
            <Link to="/walloffame">
              <button className="general-button">Wall of Fame</button>
            </Link>
            <div style={{ display: "inline-block", fontSize: "30px" }}>|</div>
            <button
              className="general-button"
              onClick={this.handleUserFavorite}
            >
              User Favorites
            </button>
            <button className="general-button" onClick={this.handleOpenModal}>
              Create Challenge
            </button>
          </div>
        </div>
        <br></br>
        {!this.state.displayChallenges ? (
          <div className="loading-spinner">
            <TailSpin
              height="80"
              width="80"
              color="#517EC1"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : this.state.displayChallenges.length ? (
          <div className="challenge-tile-center-box">
            <div className="challenge-tile-box">
              {this.state.displayChallenges.map((json) => (
                <ChallengeTile
                  key={json.name}
                  json={json}
                  viewProgress={this.state.viewProgress}
                  viewCompleted={this.state.viewCompleted}
                  addViewProgress={this.addViewProgress}
                  removeViewProgress={this.removeViewProgress}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginLeft: "15px" }}>No Challenges Found</div>
        )}
        {/* ----------- MODAL ---------- */}
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => this.handleCloseModal(false)}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <div className="modal-header">
            <div className="modal-title">Create Challenge</div>
            <button
              className="general-button"
              onClick={() => this.handleCloseModal(false)}
            >
              <VscChromeClose />
            </button>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-subheader">Photo</div>
            <UploadWidget setImage={this.handleSetImage} />
            {this.state.challengeThumbnail ? (
              <img
                alt="challengeThumbnail"
                src={this.state.challengeThumbnail}
              ></img>
            ) : (
              <>
                <label>No Image Selected</label>
                <input
                  type="text"
                  name="challenge-image"
                  className="hidden-input"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please Upload a challenge image"
                    )
                  }
                  required
                />
              </>
            )}
            <div className="modal-subheader">Badge (optional)</div>
            <select
              className="select-box"
              id="badges"
              name="badges"
              onChange={this.handleSelectChange}
              defaultValue={-1}
            >
              <option key={"none"} value={"none"}>
                none
              </option>
              {this.state.constantBadges.map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </select>
            {this.state.badge.image ? (
              <>
                <img
                  className="badge-image"
                  alt="badgeImage"
                  src={this.state.badge.image}
                ></img>
                <br></br>
                <span style={{ marginLeft: "15px" }}>
                  Description: {this.state.badge.description}
                </span>
              </>
            ) : (
              <></>
            )}
            <div className="modal-subheader">Challenge</div>
            <select className="select-box" id="challenges" name="challenges">
              {this.state.constantChallenges.map((challenge) => (
                <option key={challenge} value={challenge}>
                  {challenge}
                </option>
              ))}
            </select>
            <div className="modal-subheader">Tag(s)</div>
            <input
              className="modal-input"
              type="text"
              id="challengeTags"
              name="challengeTags"
              value={this.state.challengeTags}
              onChange={this.handleTagsChange}
              required
            ></input>
            <div className="modal-subheader">Title</div>
            <input
              className="modal-input"
              type="text"
              id="challengeTitle"
              name="challengeTitle"
              value={this.state.challengeTitle}
              onChange={this.handleTitleChange}
              required
            ></input>
            <div className="modal-subheader">Description</div>
            <textarea
              className="modal-input-description"
              type="text"
              id="challengeDescription"
              name="challengeDescription"
              value={this.state.challengeDescription}
              onChange={this.handleDescriptionChange}
              required
            ></textarea>
            <div className="modal-subheader">
              Goals{" "}
              {this.state.challengeGoals.length === 0 ? (
                <input
                  type="text"
                  name="goal"
                  className="hidden-input"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please add a goal to your challenge"
                    )
                  }
                  required
                />
              ) : (
                <></>
              )}
              <button
                className="general-button"
                type="button"
                onClick={this.addFields}
              >
                +
              </button>
            </div>
            {this.state.challengeGoals.map((goal, index) => [
              <input
                key={index}
                className="modal-input"
                placeholder={goal}
                type="text"
                id="challengeGoals"
                name="challengeGoals"
                value={goal}
                onChange={(event) => this.handleGoalChange(event, index)}
                required
              ></input>,
              <button
                key={"button" + index}
                className="general-button"
                type="button"
                onClick={() => this.removeFields(index)}
              >
                -
              </button>,
              <br key={"space" + index}></br>,
            ])}
            <br></br>
            <button className="general-button" type="submit">
              Submit
            </button>{" "}
            <button
              className="general-button"
              type="button"
              onClick={() => this.handleClearForm(false)}
            >
              Clear
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
