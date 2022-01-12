import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCar } from "../store/car";
import { useParams } from 'react-router-dom'

const SingleCar = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { car } = useSelector((state) => {
    return {
      car: state.car,
    };
  });
  
  useEffect(() => {
    dispatch(fetchCar(id));
  }, []);
  
  console.log(car)

  return (
    <div>
      <h1>HELLO WORLD{car.id || 'none'}</h1>
      <h3>
        {car.make} {car.model}
      </h3>
      <img className="image-car" src={car.imageUrl} />
    </div>
  );
};

export default SingleCar;
