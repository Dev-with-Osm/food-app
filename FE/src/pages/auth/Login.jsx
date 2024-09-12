import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '../../assets/icons/lockIcon';
import EnvlopeIcon from '../../assets/icons/envlopeIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../redux/user/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email is not valid.';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with login
    if (Object.keys(newErrors).length === 0) {
      dispatch(signInStart());

      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        // If there is an error, display it
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }

        dispatch(signInSuccess(data.data));
        navigate('/'); // Redirect to home or other desired page
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="border border-[#B2CBAD] rounded-md w-full md:w-auto p-6 px-5 mx-3">
        <div className="flex flex-col items-center border-b-2 pb-4">
          <p className="text-[#2C3E50] font-semibold">Bon Retour</p>
          <h1 className="text-base text-[#2C2C54] opacity-90 font-medium">
            Connectez-vous à votre compte
          </h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="py-4 flex flex-col gap-5 md:w-[480px]"
        >
          <div className="flex justify-center gap-2 flex-col">
            <label className="text-base flex items-center gap-1">
              Adresse Email
              <span className="text-lg text-red-300">*</span>
            </label>
            <div>
              <EnvlopeIcon className="absolute text-lg mt-3 ml-3" />
              <input
                placeholder="exemple@onee.ma"
                type="email"
                name="email"
                disabled={loading}
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed placeholder:text-xs placeholder:text-text-secondary w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <label className="text-base flex items-center gap-1">
              Mot de passe
              <span className="text-lg text-red-300">*</span>
            </label>
            <div>
              <LockIcon className="absolute text-lg mt-3 ml-3" />
              <input
                placeholder="Mot de passe secret"
                type="password"
                name="password"
                disabled={loading}
                value={formData.password}
                onChange={handleInputChange}
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed placeholder:text-xs placeholder:text-text-secondary w-full"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className="bg-[#B2CBAD] hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-md text-black text-xl font-semibold hover:bg-[#F9B5AC]"
            >
              {loading ? 'loading...' : 'Connexion'}
            </button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-[11px] text-right">
              Vous n'avez pas de compte ?{' '}
              <Link
                to={'/register'}
                className="text-blue-500 underline underline-offset-2"
              >
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
