import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import MenuIcon from '../../assets/icons/menuIcon';
import { navigation } from './Constants';
import OutsideClickHandler from 'react-outside-click-handler';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  return (
    <div className="shadow-sm">
      <div className="flex justify-between items-center py-4 md:py-0 max-w-[1240px] mx-auto px-4">
        <div className="flex items-center gap-1">
          <div
            onClick={() => setNav(!nav)}
            className="block md:hidden cursor-pointer"
          >
            {nav ? <CloseIcon /> : <MenuIcon />}
          </div>
          <p className="text-3xl font-semibold ">
            Gourmet <span className="text-[#ff9100]">Éolien</span>
          </p>
          <ul className="hidden md:flex items-center ml-16">
            {navigation.map((item) => (
              <li
                key={item.id}
                className="p-4 rounded-xl my-2 cursor-pointer duration-300 hover:text-text-secondary"
              >
                <p to={item.url}>{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          <div>
            <button className="bg-[#ff9100] text-xl font-semibold py-2 px-6 rounded-full text-white hover:-tracking-tighter duration-300 ease-in-out">
              Login
            </button>
          </div>
          <ul
            className={
              nav
                ? 'fixed flex flex-col md:hidden left-0 top-0 z-[99] w-[60%] h-[100vh] shadow-md text-primary-dark container ease-in-out duration-500 bg-white'
                : 'ease-in-out flex flex-col  w-[60%] z-[99] duration-500 fixed top-0 bottom-0 left-[-100%] '
            }
          >
            {/* Mobile Logo */}
            {/* Mobile Navigation Items */}
            <div className="mt-5 flex flex-col items-center justify-center h-3/4">
              {navigation.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center m  p-4  text-lg duration-300 font-semibold cursor-pointer"
                >
                  <p onClick={() => setNav(false)} to={item.url}>
                    {item.title}
                  </p>
                </li>
              ))}
            </div>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
