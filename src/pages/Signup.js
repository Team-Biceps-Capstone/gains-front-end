//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password,password2, city, state, zip)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Name: </label>
      <input 
        type="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      /><br/>

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /><br/>

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /><br/>

      <label>Re-enter Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword2(e.target.value)} 
        value={password2} 
      />{error==="password must match" && <div className="error">{error}</div>}<br/>

      <label>City:</label>
      <input 
        type="city" 
        onChange={(e) => setCity(e.target.value)} 
        value={city} 
      /><br/>

      <label>State:</label>
      <input 
        type="state" 
        onChange={(e) => setState(e.target.value)} 
        value={state} 
      /><br/>

      <label>Zipcode:</label>
      <input 
        type="zip" 
        onChange={(e) => setZip(e.target.value)} 
        value={zip} 
      /><br/>


      <button disabled={isLoading}>Sign up</button><br/>
      {error!=="password must match" && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup