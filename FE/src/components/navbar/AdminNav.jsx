import React, { useState } from 'react';
import ArrowDown from '../../assets/icons/arrowDown';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

export default function AdminNav() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
        <button
          onClick={() => setMenu((prevState) => !prevState)}
          className={`bg-[#5aa39e] hover:bg-[#088178] ease-in-out duration-200 text-white py-2 px-4 rounded-md flex items-center gap-2 z-50 ${
            menu && ' !bg-[#088178]'
          }`}
        >
          Panneau <br className="md:hidden" /> d'administration
          <ArrowDown
            className={`w-5 transform transition-transform duration-300 ${
              menu ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`transition-all duration-500 ease-in-out ${
            menu ? 'block' : 'hidden'
          } bg-transparent z-10 absolute w-[180px] md:w-[250px] md:right-[90px] md:top-12 md:mt-5 mt-2 mr-5 2xl:mr-40`}
        >
          <div className="flex items-center justify-center gap-3 text-white flex-col rounded-md border-white border bg-green-500 shadow-md p-3">
            <Link
              to={'/all-dishes'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Tous les plats
            </Link>
            <hr className="h-[1px] bg-white w-full " />

            <Link
              to={'/add-new-dish'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Ajouter un nouveau plat
            </Link>
            <hr className="h-[0.5px] bg-white w-full " />

            <Link
              to={'/edit-dish'}
              className="hover:text-[#302e29] ease-in-out duration-200"
            >
              Supprimer / Modifier un plat
            </Link>
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
}
