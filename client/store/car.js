import axios from 'axios';

const SET_CAR = 'SET_CAR';

export const _setCar = (car) => {
  return {
    type: SET_CAR,
    car,
  };
};

export const fetchCar = (id) => {
  return async (dispatch) => {
    try {
      const car = (await axios.get(`/api/cars/${id}`)).data;
      dispatch(_setCar(car));
    } catch (error) {
      next(error);
    }
  };
};

export default function singleCarReducer(state = {}, action) {
  switch (action.type) {
    case SET_CAR:
      return action.car;
    default:
      return state;
  }
}
