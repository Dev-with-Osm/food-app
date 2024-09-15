import React, { useEffect, useState } from 'react';
import DishItem from './adminPanel/DishItem';

export default function MenuPage() {
  const [allDishes, setAllDishes] = useState([]);
  console.log(allDishes);

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
      <div className="max-w-6xl w-full text-center my-14 flex flex-col gap-5">
        <h1 className="my-5 text-2xl font-semibold">
          Notre menu pour aujourd'hui
        </h1>
        <h2 className="text-2xl text-left font-semibold">Entrées :</h2>
        <div className="flex gap-5 md:justify-normal justify-center items-center flex-wrap">
          {allDishes
            .filter((item) => item.isOnMenuToday && item.category === 'Entrée')
            .map((item) => (
              <DishItem dishId={item._id} key={item._id} />
            ))}
        </div>
        <h2 className="text-2xl text-left font-semibold">Plats principaux :</h2>
        <div className="flex gap-5 md:justify-normal justify-center items-center flex-wrap">
          {allDishes
            .filter(
              (item) =>
                item.isOnMenuToday && item.category === 'Plat Principal',
            )
            .map((item) => (
              <DishItem dishId={item._id} key={item._id} />
            ))}
        </div>
        <h2 className="text-2xl text-left font-semibold">Desserts :</h2>
        <div className="flex gap-5 md:justify-normal justify-center items-center flex-wrap">
          {allDishes
            .filter((item) => item.isOnMenuToday && item.category === 'Dessert')
            .map((item) => (
              <DishItem dishId={item._id} key={item._id} />
            ))}
        </div>
        <h2 className="text-2xl text-left font-semibold">Boissons :</h2>
        <div className="flex gap-5 md:justify-normal justify-center items-center flex-wrap">
          {allDishes
            .filter((item) => item.isOnMenuToday && item.category === 'Boisson')
            .map((item) => (
              <DishItem dishId={item._id} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
}
