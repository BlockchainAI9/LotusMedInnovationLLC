import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

import React from 'react'
import Image from 'next/image';


const page = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* Responsive Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/nycpic.jpeg"
          alt="homepage background image"
          fill
          priority
          className="hidden min-[1181px]:block object-cover object-center w-full h-full"
          sizes="100vw"
        />
        <Image
          src="/nycpic.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-[72%_62%] w-full h-full min-[1181px]:hidden [@media(orientation:landscape)_and_(max-width:1180px)]:hidden"
          sizes="100vw"
          aria-hidden
        />
        <Image
          src="/nycpic.jpeg"
          alt=""
          fill
          priority
          className="hidden object-cover object-[center_0%] w-full h-full translate-y-8 [@media(orientation:landscape)_and_(max-width:1180px)]:block min-[1181px]:!hidden"
          sizes="100vw"
          aria-hidden
        />
        {/* Optionally add a dark overlay for better contrast */}
        {/* <div className="absolute inset-0 bg-black/30" /> */}
      </div>

      {/* Main Content (add your content here) */}
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        {/* Example content: Logo or Heading */}
        {/* <Logo /> */}
        {/* <h1 className="text-white text-4xl font-bold">Welcome to LotusMed</h1> */}
      </div>
    </section>
  );
}

export default page
