import React, { Component } from 'react'
import "../css/Challenge.css"
import Modal from 'react-modal';
import { VscChromeClose} from "react-icons/vsc";
import axios from 'axios';

export default class Challenge extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      challengeTitle: "",
      challengeDescription: "",
      challengeTags: "",
      challengeGoals: [],
      constantChallenges: [],
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/constants/challenges`)
      .then(res => {
        console.log(res.data)
        const constantChallenges = res.data.challenges;
        this.setState({ constantChallenges });
      })
  }

  handleSubmit = event => {
    event.preventDefault();

    const req = {
      name: this.state.challengeTitle,
      description: this.state.challengeDescription,
      tags: this.state.challengeTags,
      challenge: document.getElementById("challenges").value,
      goals: this.state.challengeGoals
    };
    
    axios.post(`http://localhost:4000/challenge`, req)
      .then(res => {
        this.handleClearForm();
        this.handleCloseModal();
        console.log(res);
        console.log(res.data);
      })
  }

  handleTagsChange = event => {
    this.setState({ challengeTags: event.target.value });
  }

  handleTitleChange = event => {
    this.setState({ challengeTitle: event.target.value });
  }

  handleDescriptionChange = event => {
    this.setState({ challengeDescription: event.target.value });
  }

  handleGoalChange = (event, key) => { 
    var newArray = [...this.state.challengeGoals]
    newArray[key] = event.target.value
    this.setState({ challengeGoals: newArray});
  }

  removeFields = (index) => {
    let data = [...this.state.challengeGoals];
    data.splice(index, 1)
    this.setState({ challengeGoals: data});
  }

  addFields = () => {
    this.setState({ challengeGoals: [...this.state.challengeGoals, ""]});
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false , challengeTitle: "", challengeDescription: ""});
  }

  handleClearForm () {
    this.setState({ challengeTags: "", challengeTitle: "", challengeDescription: ""});
  }

  


  render() {
    return (
      <div className='challenge'>
        <input className='search-bar'></input>
        <button className='general-button'>Search</button>
        <button className='general-button'>User Favorites</button>
        <button className='general-button'>My Challenges</button>
        <button className='general-button'>Wall of Fame</button>
        <button className='general-button' onClick={this.handleOpenModal}>Create Challenge</button>
        <Modal 
           isOpen={this.state.showModal}
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={false}
           ariaHideApp={false}
        >
          <div className='modal-header'>
            <div className='modal-title'>Create Challenge</div>
            <VscChromeClose className='close-icon' onClick={this.handleCloseModal} size={30}/>
          </div>
          <form onSubmit={this.handleSubmit}>
          <div className='modal-subheader'>Photo</div>
          <div className='modal-subheader'>Badge</div>
          <div className='modal-subheader'>Challenge</div>
          <select className='select-box' id="challenges" name="challenges">
            {this.state.constantChallenges.map((challenge) => <option key={challenge} value={challenge}>{challenge}</option>)}
          </select>
          <div className='modal-subheader'>Tag(s)</div>
          <input className='modal-input' placeholder={this.state.challengeTags} type="text" id="challengeTags" name="challengeTags" value={this.state.challengeTags} onChange={this.handleTagsChange}></input>
            <div className='modal-subheader'>Title</div>
            <input className='modal-input' placeholder={this.state.challengeTitle} type="text" id="challengeTitle" name="challengeTitle" value={this.state.challengeTitle} onChange={this.handleTitleChange}></input>
            <div className='modal-subheader'>Description</div>
            <textarea className='modal-input-description' placeholder={this.state.challengeDescription} type="text" id="challengeDescription" name="challengeDescription" value={this.state.challengeDescription} onChange={this.handleDescriptionChange}></textarea>
            <div className='modal-subheader'>Goals <button className='general-button' type='button' onClick={this.addFields}>+</button></div>
            {this.state.challengeGoals.map((goal, index) => [<input key={index} className='modal-input' placeholder={goal} type="text" id="challengeGoals" name="challengeGoals" value={goal} onChange={event => this.handleGoalChange(event, index)}></input>
            ,<button key={"button" + index}className='general-button' type='button' onClick={() => this.removeFields(index)}>-</button>,<br key={"space"+index}></br>])}
            <br></br><button className='general-button' type='submit'>Submit</button> <button className='general-button' type='button' onClick={this.handleClearForm}>Clear</button>
          </form>
        </Modal>
      </div>
    )
  }
}
