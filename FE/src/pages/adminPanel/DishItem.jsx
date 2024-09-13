import React, { useEffect, useState } from 'react';
import CartIcon from '../../assets/icons/cartIcon';
import './style.css';

export default function DishItem({ dishId }) {
  console.log({ dishId });

  const [dish, setDish] = useState({});
  console.log({ dish });

  useEffect(() => {
    const fetchDish = async () => {
      const res = await fetch(`/api/v1/admin/${dishId}`);
      const data = await res.json();
      setDish(data.data);
    };
    fetchDish();
  }, []);
  return (
    <div className=" md:hover:scale-105 md:transition-scale w-[250px] px-3 py-2 border  border-[#cce7d0] rounded-md cursor-pointer overflow-hidden shadow-sm hover:shadow-lg duration-100 ease-in relative flex flex-col gap-2 dish">
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
      <div className="flex items-center justify-between  font-semibold">
        <span className="text-[#088178] text-[16px]">{dish.name}</span>
        <p className="text-xs bg-green-200 p-1 rounded-md">{dish.category}</p>
      </div>
      <p className="line-clamp-2 text-sm text-left">{dish.description}</p>
      <div className="flex justify-between">
        <div className="flex text-xs gap-1 flex-wrap line-clamp-2 text-[#088178] font-medium w-3/4">
          {dish?.ingredients?.map((item) => (
            <p>{item.name}</p>
          ))}
        </div>
        <button
          disabled={!dish.isOnMenuToday}
          className="disabled:cursor-not-allowed disabled:hover:bg-gray-300 w-10 h-10 rounded-full bg-[#e8f6ea] text-[#088178] flex items-center justify-center hover:text-[#1a1a1a] hover:bg-[#E4B34C] ease-in-out duration-300"
        >
          <CartIcon className={'w-5'} />
        </button>
      </div>
    </div>
  );
}
