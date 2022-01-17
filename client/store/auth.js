import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = (auth, loginStatus) => ({
  type: SET_AUTH,
  auth,
  loginStatus
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })

    if(res.data.id){
      return dispatch(setAuth(res.data, true))
    }else{
      return dispatch(setAuth(res.data, false))
    }
  }
}

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const signUp = (password, firstName, lastName, email) => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', {password, firstName, lastName, email})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logIn = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/auth/login', {email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => dispatch => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return dispatch(setAuth({}, false))
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return {...action.auth, loginStatus: action.loginStatus}
    default:
      return state
  }
}
