
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from './Logo';

const Navbar = () => {
  return (
    <div className="">
      {/* CONTAUNER */}
      <nav className="fixed flex h-[80px]  w-full items-center justify-between px-4 sm:px-8 lg:px-8 z-30 bg-white">
         {/* Logo */}
    <Link href={'/Homepage'} className="">
    <Image
        className="mb-2 cursor-pointer z-40"
        width={300}
        height={118}
        objectFit="cover"
        quality={100}
        src="/LogoV3.svg"
        alt="logo"
      />
    </Link>
    {/* NAVLINK */}
        <ul className="flex items-center justify-end gap-4 sm:gap-8 lg:gap-8 flex-grow text-[16px] tracking-widest text-[#2C0836] font-base pl-[50px]">
          <Link className="hover:text-[#2A0A5B] hover:font-bold duration-300 ease-out  uppercase" href="/Homepage">Home</Link>
          <Link className="hover:text-[#2A0A5B] hover:font-bold duration-300 ease-out  uppercase" href="/about">About</Link>
          <Link className="hover:text-[#2A0A5B] hover:font-bold  duration-300 ease-out  uppercase" href="/contact">Contact</Link>

          <Link href="/">
          <Image
            className="hover:scale-105 duration-300 ease-out"
            src="/replay.png"
            width={30}
            height={30}
            alt="replay video"
          />
        </Link>
        </ul>
      
      </nav>
    </div>
  );
};

export default Navbar;
