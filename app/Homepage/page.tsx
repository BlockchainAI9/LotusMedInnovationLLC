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
          className="object-cover w-full h-full"
          sizes="100vw"
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
