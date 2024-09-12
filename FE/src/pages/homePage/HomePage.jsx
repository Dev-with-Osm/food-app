import React from 'react';

export default function HomePage() {
  return (
    <div className="relative h-screen mt-10 overflow-hidden">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl md:text-5xl text-center font-semibold md:leading-normal px-2">
          Taste the Best, Delivered to Your Desk{' '}
          <br className="hidden md:block" />
          Effortless Workplace{' '}
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
            Dining
          </span>
          .
        </h1>
        <p className="text-center md:text-lg font-medium opacity-80 px-10">
          Delicious, nutritious meals delivered straight to your office.{' '}
          <br className="hidden md:block" />
          Designed for employees at{' '}
          <span className="font-semibold bg-gradient-to-r from-[#006699] to-[#0090c2] bg-clip-text text-transparent">
            Onee
          </span>
        </p>
        <button className="bg-[#B2CBAD] rounded-full px-5 py-2 text-white hover:tracking-widest hover:text-[#302e29] font-semibold duration-300 ease-in-out">
          Get started
        </button>
      </div>
    </div>
  );
}
