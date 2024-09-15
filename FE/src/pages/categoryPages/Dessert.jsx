import React, { useEffect, useState } from 'react';
import DishItem from '../adminPanel/DishItem';

export default function Dessert() {
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const fetchAllDishes = async () => {
      const res = await fetch('/api/v1/dishes/');
      const data = await res.json();
      setAllDishes(data.data);
    };
    fetchAllDishes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <div className="max-w-6xl w-full text-center my-14">
        <h1 className="my-5 text-2xl font-semibold">Tous les Desserts</h1>
        <div className="flex gap-5 justify-center items-center flex-wrap">
          {allDishes
            .filter((item) => item.category === 'Dessert')
            .map((item) => (
              <DishItem dishId={item._id} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
}
