import React, { useEffect, useState } from 'react';

export default function CartPage() {
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await fetch('/api/v1/user/cart');
        const data = await res.json();
        setUserCart(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCart();
  }, []);

  const removeFromCart = async (dishId) => {
    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer ce plat ?',
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/v1/user/cart/${dishId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();

        if (data.success) {
          setUserCart((prevCart) =>
            prevCart.filter((item) => item.dish._id !== dishId),
          );
          alert('Plat retiré du panier avec succès');
        } else {
          alert('Échec de la suppression du plat du panier');
        }
      } catch (error) {
        console.log(error);
        alert('Une erreur est survenue lors de la suppression du plat');
      }
    }
  };

  const checkoutUserCart = async () => {
    const confirmCheckout = window.confirm(
      'Êtes-vous sûr de vouloir passer à la caisse ?',
    );
    const checkoutCode =
      Math.random().toString(36).slice(-4) +
      Math.random().toString(36).slice(-4);
    if (confirmCheckout) {
      try {
        const res = await fetch('/api/v1/user/cart/clear-cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          alert(
            `Paiement effectué avec succès, voici votre code ${checkoutCode}`,
          );
          setUserCart([]);
        }
      } catch (error) {
        console.log(error);
        alert('Une erreur est survenue lors du paiement');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4">
      <div className="max-w-6xl w-full text-center my-14 flex flex-col gap-10">
        <h1 className="my-5 text-2xl font-semibold">Votre panier</h1>
        <div className="flex gap-5 justify-center items-center flex-wrap">
          {userCart.length <= 0 && (
            <div>Vous n'avez aucun plat dans votre panier</div>
          )}
          {userCart.map((item) => (
            <div
              key={item.dish._id}
              className="w-80 h-40 bg-white shadow-md p-2 flex rounded-md"
            >
              <div
                className="w-36 h-full bg-cover bg-center mb-4 rounded-md"
                style={{
                  backgroundImage: `url(${item.dish.dishImage})`,
                }}
              ></div>
              <div className="relative ml-2">
                <h2 className="text-lg font-semibold">{item.dish.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-3 max-w-40">
                  {item.dish.description}
                </p>
                <button
                  onClick={() => removeFromCart(item.dish._id)}
                  className="bg-red-400 w-full absolute bottom-0 right-0 text-white py-2 rounded-md"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
        {userCart.length > 0 && (
          <button
            onClick={checkoutUserCart}
            className="md:self-end self-center bg-green-500 p-2 md:mr-20 rounded-md w-full md:w-auto"
          >
            Passer à la caisse
          </button>
        )}
      </div>
    </div>
  );
}
