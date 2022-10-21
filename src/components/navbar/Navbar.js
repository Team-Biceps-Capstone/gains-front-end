import React, {Component} from "react";
import { Link } from "react-router-dom";
import '../../css/Navbar.css';
import logo from '../../images/logo.png';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isNavToggled: false };
        this.handleNavToggle = this.handleNavToggle.bind(this);
      }

    handleNavToggle(logo) {
        if (logo && !this.state.isNavToggled){
            return
        }

        this.setState(prevState => ({
            isNavToggled: !prevState.isNavToggled
        }));
        const burger = document.querySelector(".burger");
        burger.classList.toggle("toggle");
    }

    render() {
        return (
            <nav>
                <div className='logo'>
                    <Link to="/">
                        <img alt='logo' className='nav-logo' src={logo} onClick={() => this.handleNavToggle(true)} />
                    </Link>
                </div>
                <div className="website-title">
                    Gains
                </div>
                <div className={this.state.isNavToggled ? "nav-links-box" : "nav-links-hidden"}>
                    <div className='nav-links'>
                        <Link to="/">
                            <div onClick= {() => this.handleNavToggle(false)}>Home</div>
                        </Link>
                        <Link to="/about">
                            <div onClick= {() => this.handleNavToggle(false)}>About Us</div>
                        </Link>
                        <Link to="/challenge">
                            <div onClick= {() => this.handleNavToggle(false)}>Challenges</div>
                        </Link>
                        <Link to="/login">
                            <div onClick= {() => this.handleNavToggle(false)}>Sign In / Register</div>
                        </Link>
                    </div>
                </div>
                <div className="burger" onClick = {() => this.handleNavToggle(false)}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>

            </nav>
        )
    
  }
}
