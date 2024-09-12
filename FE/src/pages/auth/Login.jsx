import React from 'react';
import EnvlopeIcon from '../../assets/icons/envlopeIcon';
import { Link } from 'react-router-dom';
import LockIcon from '../../assets/icons/lockIcon';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="border border-[#B2CBAD] rounded-md w-full md:w-auto p-6 px-5 mx-3">
        <div className="flex flex-col items-center border-b-2 pb-4">
          <p className="text-[#2C3E50] font-semibold">Bon Retour</p>
          <h1 className="text-base text-[#2C2C54] opacity-90 font-medium">
            Connectez-vous à votre compte
          </h1>
        </div>
        <form className="py-4 flex flex-col gap-5 md:w-[480px]">
          <div className="flex justify-center gap-2 flex-col">
            <label className="text-base flex items-center gap-1">
              Adresse Email
              <span className="text-lg text-red-300 ">*</span>
            </label>
            <div>
              <EnvlopeIcon className="absolute text-lg mt-3 ml-3" />
              <input
                placeholder="exemple@onee.ma"
                type="email"
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-col">
            <label className="text-base flex items-center gap-1">
              Mot de passe
              <span className="text-lg text-red-300 ">*</span>
            </label>
            <div>
              <LockIcon className="absolute text-lg mt-3 ml-3" />
              <input
                placeholder="Mot de passe secret"
                type="password"
                className="border-2 border-solid border-text-[#ADC6A1] focus:border-0 bg-transparent hover:border-[#ADC6A1] focus:ring-2 outline-none focus:ring-[#ADC6A1] transition-all duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md disabled:cursor-not-allowed  placeholder:text-xs placeholder:text-text-secondary w-full"
              />
            </div>
          </div>
          <div className="mt-2 flex gap-3 flex-col">
            <button
              type="submit"
              className=" bg-[#B2CBAD] hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2 w-full rounded-md text-black text-xl font-semibold hover:bg-[#F9B5AC]"
            >
              Connexion
            </button>
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
