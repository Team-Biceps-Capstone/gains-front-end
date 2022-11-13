//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022

import { useState} from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
 
  return (
    <form id="login" className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <div>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /></div><br/>

      <label>Password:</label>
      <div>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
      /></div><br/>

      <button className='general-button' disabled={isLoading} >Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login