import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCars } from "../store/cars";

const AllCars = () => {
  const { cars } = useSelector((state) => {
    return {
      cars: state.cars,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>
          <h3>
            {car.make} {car.model}
          </h3>
          <img className="image-car" src={car.imageUrl} />
        </div>
      ))}
    </div>
  );
};

export default AllCars;
