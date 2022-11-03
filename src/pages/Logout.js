import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Logout = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
          <h3>Are you sure you want to logout out?</h3>
          <div>
            <Link to="/">
            <button onClick={handleClick} to='/'>Log out</button>
            </Link>
          </div>
      </div>
    </header>
  )
}

export default Logout