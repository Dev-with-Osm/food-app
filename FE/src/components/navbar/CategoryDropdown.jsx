import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import ArrowDown from '../../assets/icons/arrowDown';

export default function CategoryDropdown() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="relative">
      <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
        <button
          onClick={() => setMenu((prevState) => !prevState)}
          className={`p-4 rounded-xl my-2 cursor-pointer duration-300 hover:text-[#B2CBAD] ease-in-out text-lg font-semibold flex items-center gap-2 ${
            menu ? 'text-[#B2CBAD]' : ''
          }`}
        >
          Catégorie
          <ArrowDown
            className={`w-5 transform transition-transform duration-300 ${
              menu ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`transition-all duration-500 ease-in-out ${
            menu ? 'block' : 'hidden'
          } bg-transparent z-10 absolute w-[180px] md:w-[250px] md:-right-40 md:top-12 md:mt-5 mt-2 mr-5 2xl:mr-40 -right-[60px] top-14`}
        >
          <div className="flex items-center justify-center gap-3 text-white flex-col rounded-md border-white border bg-green-500 shadow-md p-3">
            <Link
              to={'/category/entree'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Entree
            </Link>
            <hr className="h-[1px] bg-white w-full " />

            <Link
              to={'/category/plat-principal'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Plat Principal
            </Link>
            <hr className="h-[0.5px] bg-white w-full " />

            <Link
              to={'/category/dessert'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Dessert
            </Link>
            <hr className="h-[0.5px] bg-white w-full " />

            <Link
              to={'/category/boissons'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Boisson
            </Link>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
