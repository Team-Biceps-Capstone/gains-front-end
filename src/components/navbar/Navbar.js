import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import logo from '../../images/logo.png'
import '../../css/Navbar.css';
import { React, useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const burgerRef = useRef()

  //on click Logout
  const handleClick = () => {
    handleNavToggle(false);
    logout()
  }

  const handleNavToggle = (logo)  =>{
    if (logo && !isNavExpanded){
        return
    }
    setIsNavExpanded(!isNavExpanded);
    const burger = document.querySelector(".burger");
    burger.classList.toggle("toggle");
  }

  //close nav buger links when clicked outside
  useEffect(() => {
    const closeNav = e => {
        //note that the path at indices zero and one refer to div and each line div respectively
        if (e.path[0] !== burgerRef.current && e.path[1] !== burgerRef.current && isNavExpanded){
            setIsNavExpanded(!isNavExpanded)
            const burger = document.querySelector(".burger");
            burger.classList.toggle("toggle");    
        }
    }
    document.body.addEventListener('click', closeNav)
    return () => document.body.removeEventListener('click', closeNav)
  })
  


  return (
    <nav>
        <Link to="/">
            <img alt='logo' className='nav-logo' src={logo} onClick={() => {handleNavToggle(true)}}/>
        </Link>
        <Link to="/">
        <div className="website-title" onClick={() => {handleNavToggle(true)}}> Gains </div>
        </Link>
        <div className="burger" ref={burgerRef} onClick={() => {handleNavToggle(false)}}>
            <div className="line1" ></div>
            <div className="line2" ></div>
            <div className="line3" ></div>
        </div>
                
        <div className={isNavExpanded ? "nav-links-box" : "nav-links-hidden"}>
            <div className='nav-links-box'>
                {user && (
                    <div> 
                        <span className='username'>{user.email}</span>
                        &nbsp;<button onClick={handleClick}>Log out</button>

                    <div className='nav-links'>
                        <Link to="/">
                            <div onClick={() => {handleNavToggle(false)}}>Home</div>
                        </Link>
                        <Link to="/about">
                            <div onClick={() => {handleNavToggle(false)}}>About Us</div>
                        </Link>
                        <Link to="/challenge">
                            <div onClick={() => {handleNavToggle(false)}}>Challenges</div>
                        </Link>
                       
                    </div>
                    </div>
                )}
                
                {!user && (
                    <div className='nav-links'>
                        <Link to="/">
                            <div onClick={() => {handleNavToggle(false)}}>Home</div>
                        </Link>
                        <Link to="/about">
                            <div onClick={() => {handleNavToggle(false)}}>About Us</div>
                        </Link>
                        <Link to="/login">
                            <div onClick={() => {handleNavToggle(false)}}>Login</div>
                        </Link>
                        <Link to="/signup">
                            <div onClick={() => {handleNavToggle(false)}}>Signup</div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
      </nav>
    
  )
}

export default Navbar

