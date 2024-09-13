import React, { useEffect, useState } from 'react';
import DishItem from './DishItem';

export default function AllDishes() {
  const [allDishes, setAllDishes] = useState([]);
  console.log(allDishes);

  useEffect(() => {
    const fetchAllDishes = async () => {
      const res = await fetch('/api/v1/admin/');
      const data = await res.json();
      setAllDishes(data.data);
    };
    fetchAllDishes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <div className="max-w-6xl w-full text-center my-14">
        <h1 className="my-5 text-2xl font-semibold">Les plats d'entrée :</h1>
        {/* <div className="my-10 flex justify-center"> */}
        <div className="flex gap-5 justify-center items-center flex-wrap">
          {allDishes.map((item) => (
            <DishItem dishId={item._id} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
