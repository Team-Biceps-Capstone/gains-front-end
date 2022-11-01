import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import logo from '../../images/logo.png'
import '../../css/Navbar.css';
import { React, useState } from 'react';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  //on click Logout
  const handleClick = () => {
    logout()
  }

 
  return (
    <nav>
      <div className="container" >
        <Link to="/">
        <img alt='logo' className='nav-logo' src={logo} />
        </Link>
        <div className="website-title"> Gains </div>
        <div className="burger"  onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
                
        <div className={isNavExpanded ? "nav-links-box" : "nav-links-hidden"}>
             <div className='nav-links-box'>
                {user && (
                    <div onClick={() => {setIsNavExpanded(!isNavExpanded)}}> 
                        <span>{user.email}</span> 
                        <button onClick={handleClick}>Log out</button>
                        
                    <div className='nav-links'  onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
                        <Link to="/">
                            <div>Home</div>
                        </Link>
                        <Link to="/about">
                            <div>About Us</div>
                        </Link>
                        <Link to="/challenge">
                            <div>Challenges</div>
                        </Link>
                       
                    </div>
                    </div>
                )}
                
                {!user && (
                    <div className='nav-links' onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
                        <Link to="/">
                            <div>Home</div>
                        </Link>
                        <Link to="/about">
                            <div>About Us</div>
                        </Link>
                        <Link to="/login">
                            <div>Login</div>
                        </Link>
                        <Link to="/signup">
                            <div>Signup</div>
                        </Link>
                    </div>
                )}
            </div>
            </div>
            </div>
           

           
     
      </nav>
    
  )
}

export default Navbar
