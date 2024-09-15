import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function DishToModify() {
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const fetchAllDishes = async () => {
      const res = await fetch('/api/v1/dishes/');
      const data = await res.json();
      setAllDishes(data.data);
    };
    fetchAllDishes();
  }, []);

  const handleDelete = async (dishId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this dish?',
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/v1/admin/delete-dish/${dishId}`, {
          method: 'DELETE',
        });
        const result = await res.json();
        if (result.success) {
          setAllDishes(allDishes.filter((dish) => dish._id !== dishId));
        } else {
          console.log('Failed to delete dish');
        }
      } catch (error) {
        console.error('Error deleting dish:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <div className="max-w-6xl w-full text-center my-14">
        <h1 className="my-5 text-2xl font-semibold">
          Tous Les plats pour modifier
        </h1>
        <div className="flex gap-5 justify-center items-center flex-wrap">
          {allDishes.map((dish) => (
            <div
              key={dish._id}
              className="md:hover:scale-105 md:transition-scale w-[250px] px-3 py-2 border border-[#cce7d0] rounded-md cursor-pointer overflow-hidden shadow-sm hover:shadow-lg duration-100 ease-in relative flex flex-col gap-2 dish"
            >
              {dish.isOnMenuToday ? (
                <div className="bg-green-500 -top-0 right-0 rounded-bl-md px-2 py-[2px] text-white absolute">
                  au menu
                </div>
              ) : (
                <div className="bg-red-500 -top-0 right-0 rounded-bl-md px-2 py-[2px] text-white absolute">
                  pas au menu
                </div>
              )}
              <img src={dish.dishImage} alt="" className="w-full rounded-md" />
              <div className="flex items-center justify-between font-semibold">
                <span className="text-[#088178] text-[16px]">{dish.name}</span>
                <p className="text-xs bg-green-200 p-1 rounded-md">
                  {dish.category}
                </p>
              </div>
              <p className="line-clamp-2 text-sm text-left">
                {dish.description}
              </p>
              <div className="flex justify-between items-center gap-3">
                <Link
                  className="bg-green-600 w-full py-1 text-white rounded-md"
                  to={`/edit-dish/${dish._id}`}
                >
                  Modifier
                </Link>
                <button
                  className="bg-red-600 w-full py-1 text-white rounded-md"
                  onClick={() => handleDelete(dish._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
