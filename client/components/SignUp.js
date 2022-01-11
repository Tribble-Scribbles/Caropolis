import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { signUp } from "../store";


const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUp(username, password, firstName, lastName, email))
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>

          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        </div>
        <div>

        <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        </div>
        <div>
        <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>


        <div>
          <button type="submit">Sign Up</button>
        </div>

        
      </form>
    </div>
  );
}

export default SignUp
