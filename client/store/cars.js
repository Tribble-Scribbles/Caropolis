import { CallToActionSharp } from '@material-ui/icons';
import axios from 'axios';

const SET_CARS = 'SET_CARS';
const CREATE_CAR = 'CREATE_CAR';
const UPDATE_CAR = 'UPDATE_CAR';

const _setCars = (cars) => {
  return {
    type: SET_CARS,
    cars,
  };
};

const _createCar = (car) => {
  return {
    type: CREATE_CAR,
    car,
  };
};

const _updateCar = (car) => {
  return {
    type: UPDATE_CAR,
    car,
  };
};

export const fetchCars = () => {
  return async (dispatch) => {
    try {
      const cars = (await axios.get('/api/cars')).data;
      dispatch(_setCars(cars));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCar = (car) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post('/api/cars', car);
      dispatch(_createCar(created));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCar = (car, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/cars/${car.id}`, car);
      dispatch(_updateCar(updated));
      history.push('/cars');
    } catch (error) {
      console.log(error);
    }
  };
};

export default function carsReducer(state = [], action) {
  switch (action.type) {
    case SET_CARS:
      return action.cars;
    case CREATE_CAR:
      return [...state, action.car];
    case UPDATE_CAR:
      return state.map((car) => (car.id === action.car.id ? action.car : car));
    default:
      return state;
  }
}
