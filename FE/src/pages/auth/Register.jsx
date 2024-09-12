import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockIcon from '../../assets/icons/lockIcon';
import EnvlopeIcon from '../../assets/icons/envlopeIcon';
import PersonIcon from '../../assets/icons/personIcon';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstNameRegex = /^[A-Za-z ]*$/;
    const lastNameRegex = /^[A-Za-z]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const employeeAdminEmailRegex =
      /^[a-zA-Z0-9._%+-]+(\.employee|\.admin)@onee\.ma$/;
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (!firstNameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'First Name should not contain numbers.';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (!lastNameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last Name should only contain letters.';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email is not valid.';
    } else if (!employeeAdminEmailRegex.test(formData.email.trim())) {
      newErrors.email = "You have to be one of ONEE's employees";
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with sign-up
    if (Object.keys(newErrors).length === 0) {
      console.log('Sign-up successful');
      console.log(formData);
    } else {
      console.log('Sign-up failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="border border-[#B2CBAD] mx-3 rounded-md w-full md:w-auto p-6 px-5">
        <div className="flex flex-col items-center border-b-2 pb-4">
          <p className="text-[#2C3E50] font-semibold">Bienvenue</p>
          <h1 className="text-base text-[#2C2C54] opacity-90 font-medium">
            Créez votre compte gratuitement maintenant
          </h1>
        </div>
        <form
          onSubmit={handleSignUp}
          className="py-4 flex flex-col gap-5 md:w-[480px]"
        >
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center gap-2 flex-col">
              <label className="text-base flex items-center gap-1">
                Prénom
                <span className="text-lg text-red-300">*</span>
              </label>
              <div>
                <PersonIcon className="absolute text-lg mt-3 ml-3" />
                <input
                  placeholder="Prénom"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="flex justify-center gap-2 flex-col">
              <label className="text-base flex items-center gap-1">
                Nom
                <span className="text-lg text-red-300">*</span>
              </label>
              <div>
                <PersonIcon className="absolute text-lg mt-3 ml-3" />
                <input
                  placeholder="Nom"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <label className="text-base flex items-center gap-1">
              Adresse Email
              <span className="text-lg text-red-300">*</span>
            </label>
            <div>
              <EnvlopeIcon className="absolute text-lg mt-3 ml-3" />
              <input
                placeholder="exemple@onee.ma"
                value={formData.email}
                type="email"
                name={'email'}
                onChange={handleInputChange}
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
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
                value={formData.password}
                onChange={handleInputChange}
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className=" bg-[#B2CBAD] hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-md text-black text-xl font-semibold hover:bg-[#F9B5AC]"
            >
              S'inscrire
            </button>
            <p className="text-[11px] text-right">
              Vous avez déjà un compte ?{' '}
              <Link
                to={'/login'}
                className="text-blue-500 underline underline-offset-2"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
