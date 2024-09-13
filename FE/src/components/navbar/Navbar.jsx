import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/closeIcon';
import MenuIcon from '../../assets/icons/menuIcon';
import { navigation } from './Constants';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import oneeLogo from '../../assets/images/oneeLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../../assets/icons/cartIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from '../../redux/user/userSlice';
import AdminNav from './AdminNav';
import CategoryDropdown from './CategoryDropdown';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/v1/auth/logout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data.data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
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
          <CategoryDropdown />
        </div>
        <OutsideClickHandler onOutsideClick={() => setNav(false)}>
          <div>
            {currentUser ? (
              <div className="flex gap-4 items-center">
                {currentUser.user.role === 'admin' && (
                  <div className="hidden md:block">
                    <AdminNav />
                  </div>
                )}
                <CartIcon
                  className={
                    'cursor-pointer duration-300 hover:text-[#B2CBAD] ease-in-out'
                  }
                />
                <button
                  onClick={handleLogout}
                  className="bg-[#ADC6A1] p-2 rounded-full text-white hover:text-[#302e29] duration-200 ease-in-out"
                >
                  <LogoutIcon />
                </button>
              </div>
            ) : (
              <Link
                to={'/login'}
                className="bg-[#B2CBAD] md:text-xl  px-4 font-semibold py-2 md:px-6 rounded-full text-white hover:tracking-widest hover:text-[#302e29] duration-300 ease-in-out"
              >
                Connexion
              </Link>
            )}
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
              <CategoryDropdown />
              <AdminNav />
            </div>
          </ul>
        </OutsideClickHandler>
      </div>
    </div>
  );
}
