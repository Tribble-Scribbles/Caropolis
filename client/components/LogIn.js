import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../store'


const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn(email, password))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>

        <label htmlFor='email'>
          <small>Email</small>
        </label>
        <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor='password'>
          <small>Password</small>
        </label>
        <input name='password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  )
}

export default LogIn
