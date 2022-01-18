import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCar } from "../store/car";
import { useParams } from 'react-router-dom'
import { addToCart } from "../store/cart";

const SingleCar = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { car } = useSelector((state) => {
    return {
      car: state.car,
    };
  });
  const dealerName = "California Motors Direct"
  const state = "CA"
  const condition = 'used'

  useEffect(() => {
    dispatch(fetchCar(id));
  }, []);
  
  console.log(car)

  return (
    <div>
      <div id="single-car-info">
        <h3>{car.year} {car.make} {car.model}</h3>
        <h3>{car.price}</h3>
        <img className="single-car" src={car.imageUrl} />
      </div>
      <div id="right-of-car">
        <h3>Sold by: {dealerName}</h3>
        <h4>Located in: {car.city}, {state}</h4>
        <h4>Condition: {condition}</h4>
        <h4>Mileage: {car.mileage}</h4>
        <h4>Body Style: {car.bodyType}</h4>
        <h4>Exterior color: {car.color}</h4>
        <h4>VIN: {car.vin}</h4>
        <h4>Trim: {car.trim}</h4>
        <button onClick={() => addToCart(car)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default SingleCar;
