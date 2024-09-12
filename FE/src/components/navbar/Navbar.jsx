import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import MenuIcon from '../../assets/icons/menuIcon';
import { navigation } from './Constants';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import oneeLogo from '../../assets/images/oneeLogo.png';

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
          <Link
            to={'/'}
            className="text-xl md:text-xl relative font-semibold   items-center gap-2"
          >
            <span className="md:mb-6">
              <img src={oneeLogo} className="w-24" alt="" />
            </span>
            <p>
              Gourmet <span className="text-[#B2CBAD]">Éolien</span>
            </p>
            {/* <span className="absolute -bottom-8 right-0">
              <img src={oneeLogo} className="w-24" alt="" />
            </span> */}
          </Link>
          <ul className="hidden md:flex items-center ml-16">
            {navigation.map((item) => (
              <li
                key={item.id}
                className="p-4 rounded-xl my-2 cursor-pointer duration-300 hover:text-[#B2CBAD] ease-in-out text-lg font-semibold"
              >
                <Link to={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          <div>
            <Link
              to={'/login'}
              className="bg-[#B2CBAD] md:text-xl py-1 px-4 font-semibold md:py-2 md:px-6 rounded-full text-white hover:tracking-widest hover:text-[#302e29] duration-300 ease-in-out"
            >
              Connexion
            </Link>
          </div>
          <ul
            className={
              nav
                ? 'fixed flex flex-col md:hidden left-0 top-0 z-[99] w-[60%] h-[100vh] shadow-md text-primary-dark container ease-in-out duration-500 bg-white'
                : 'ease-in-out flex flex-col  w-[60%] z-[99] duration-500 fixed top-0 bottom-0 left-[-100%] '
            }
          >
            {/* Logo Mobile */}
            {/* Éléments de Navigation Mobile */}
            <div className="mt-5 flex flex-col items-center justify-center h-full pb-20">
              {navigation.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-center  p-4  text-lg duration-300 font-semibold cursor-pointer"
                >
                  <Link onClick={() => setNav(false)} to={item.url}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
