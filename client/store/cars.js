import axios from 'axios'

const SET_CARS = 'SET_CARS'

export const _setCars = cars => {
  return {
    type: SET_CARS,
    cars
  }
}

export const fetchCars = () => {
  return async dispatch => {
    try {
      const cars = (await axios.get('/api/cars')).data
      dispatch(_setCars(cars))
    } catch (error) {
      next(error)
    }
  }
}

export default function carsReducer (state = [], action) {
  switch (action.type) {
    case SET_CARS:
      return action.cars
    default:
      return state
  }
}