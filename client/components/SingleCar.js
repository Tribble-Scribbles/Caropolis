import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCar } from "../store/car";

const SingleCar = () => {
  const { car } = useSelector((state) => {
    return {
      car: state.car,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCar());
  }, []);

  return (
    <div>
      <h3>
        {car.make} {car.model}
      </h3>
      <img className="image-car" src={car.imageUrl} />
    </div>
  );
};

export default SingleCar;
