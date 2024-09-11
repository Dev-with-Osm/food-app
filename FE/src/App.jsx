import React, { useState, useEffect } from 'react';
import PersonIcon from './assets/icons/personIcon';
import CartIcon from './assets/icons/cartIcon';
import MenuIcon from './assets/icons/menuIcon';
import CloseIcon from './assets/icons/closeIcon';

export default function App() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="h-[234567px]">
      <div
        className={`fixed w-full top-0 right-0 py-4 flex justify-between items-center px-10 md:px-[15%] ${
          isSticky ? 'sticky' : ''
        }`}
      >
        <p className="text-2xl md:text-3xl font-bold">
          Gourmet <span className="text-[#ff9100]">Éolien</span>
        </p>
        <div className={'navlink' + (isOpen ? ' open' : '')}>
          <p>Home</p>
          <p>Menu</p>
          <p>Category</p>
        </div>
        <div className="flex items-center gap-4">
          <PersonIcon className="hover:text-[#ff9100] duration-300 ease-in-out cursor-pointer" />
          <CartIcon className="hover:text-[#ff9100] duration-300 ease-in-out cursor-pointer" />
          <div onClick={() => setIsOpen(!isOpen)} className="menu">
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
