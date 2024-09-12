import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative h-screen mt-10 overflow-hidden">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl md:text-5xl text-center font-semibold md:leading-normal px-2">
          Goûtez au meilleur, livré directement à votre bureau{' '}
          <br className="hidden md:block" />
          Un lieu de travail sans effort{' '}
          <span
            style={{
              backgroundImage:
                'url("https://cdn.pixabay.com/photo/2023/08/07/08/35/broccoli-8174625_960_720.jpg")',
              backgroundSize: 'cover',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            className="text-3xl font-extrabold"
          >
            Restauration
          </span>
          .
        </h1>
        <p className="text-center md:text-lg font-medium opacity-80 px-10">
          Des repas délicieux et nutritifs livrés directement à votre bureau.{' '}
          <br className="hidden md:block" />
          Conçu pour les employés de{' '}
          <span className="font-semibold bg-gradient-to-r from-[#006699] to-[#0090c2] bg-clip-text text-transparent">
            Onee
          </span>
        </p>
        {currentUser ? (
          <Link
            to={'/menu'}
            className="bg-[#B2CBAD] rounded-full px-5 py-2 text-white hover:tracking-widest hover:text-[#302e29] font-semibold duration-300 ease-in-out"
          >
            Voir le menu
          </Link>
        ) : (
          <Link
            to={'/register'}
            className="bg-[#B2CBAD] rounded-full px-5 py-2 text-white hover:tracking-widest hover:text-[#302e29] font-semibold duration-300 ease-in-out"
          >
            Commencer
          </Link>
        )}
      </div>
    </div>
  );
}
