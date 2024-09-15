import React, { useEffect, useState } from 'react';
import CartIcon from '../../assets/icons/cartIcon';
import './style.css';

export default function DishItem({ dishId }) {
  const [dish, setDish] = useState({});

  useEffect(() => {
    const fetchDish = async () => {
      const res = await fetch(`/api/v1/dishes/${dishId}`);
      const data = await res.json();
      setDish(data.data);
    };
    fetchDish();
  }, []);

  const addDishToCart = async () => {
    try {
      const res = await fetch(`/api/v1/user/cart/${dishId}`, {
        method: 'POST', // Assuming you're adding a dish with POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.status === 400) {
        // If status is 400, show the specific message
        alert("Un plat de la catégorie 'Entrée' est déjà dans votre panier.");
      } else if (res.ok) {
        // Handle success case
        alert('Plat ajouté avec succès');
      } else if (res.status === 401) {
        alert("Vous devez d'abord vous connecter");
      } else {
        // Handle other status codes if necessary
        alert("Une erreur s'est produite");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du plat au panier:", error);
    }
  };

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
          {dish?.ingredients?.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))}
        </div>
        <button
          onClick={addDishToCart}
          disabled={!dish.isOnMenuToday}
          className="disabled:cursor-not-allowed disabled:hover:bg-gray-300 w-10 h-10 rounded-full bg-[#e8f6ea] text-[#088178] flex items-center justify-center hover:text-[#1a1a1a] hover:bg-[#E4B34C] ease-in-out duration-300"
        >
          <CartIcon className={'w-5'} />
        </button>
      </div>
    </div>
  );
}
