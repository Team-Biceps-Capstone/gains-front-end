//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
import React from "react"
import Select from 'react-select';
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

//List of states
import options from "../components/States"

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
      <div>
      <input 
        type="name" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      /></div><br/>

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

      <label>Re-enter Password:</label>
      <div>
      <input 
        type="password" 
        onChange={(e) => setPassword2(e.target.value)} 
        value={password2} 
      />{error==="password must match" && <div className="error">{error}</div>}</div><br/>

      <label>City:</label>
      <div>
      <input
        type="city" 
        onChange={(e) => setCity(e.target.value)} 
        value={city} 
      /></div><br/>

      <label>State:</label>
      <div style={{width: '179px'}} >
      <Select
        maxMenuHeight={320}
        options={options}
        type="state" 
        onChange={(e) => setState(e)} 
        value={state} 
       
      /></div><br/>

      <label>Zipcode:</label>
      <div>
      <input 
        type="zip" 
        onChange={(e) => setZip(e.target.value)} 
        value={zip} 
      /></div><br/>


      <button className='general-button' disabled={isLoading}>Sign up</button><br/>
      {error!=="password must match" && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup