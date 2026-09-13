"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="">
      <nav className="fixed flex h-[80px]  w-full items-center justify-between px-4 sm:px-8 lg:px-8 z-30 bg-white max-md:pl-0">
        <Link href={"/Homepage"} className="max-md:-ml-2" onClick={() => setMenuOpen(false)}>
          <Image
            className="mb-2 cursor-pointer z-40 hidden md:block"
            width={300}
            height={118}
            objectFit="cover"
            quality={100}
            src="/LogoV3.svg"
            alt="logo"
          />
          <Image
            className="cursor-pointer z-40 h-[118px] w-auto -translate-x-[4px] object-left object-contain md:hidden"
            width={300}
            height={118}
            quality={100}
            src="/LogoV3.svg"
            alt="logo"
          />
        </Link>

        <ul className="hidden md:flex items-center justify-end gap-4 sm:gap-8 lg:gap-8 flex-grow text-[16px] tracking-widest text-[#2C0836] font-base pl-[50px]">
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

        <button
          type="button"
          className="md:hidden relative z-40 flex h-10 w-10 items-center justify-center"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-full bg-[#2C0836] transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[2px] w-full bg-[#2C0836] transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-[2px] w-full bg-[#2C0836] transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-20 bg-black/40 md:hidden transition-opacity ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-[80px] left-0 right-0 z-20 bg-white md:hidden shadow-lg transition-transform ${menuOpen ? "translate-y-0" : "pointer-events-none -translate-y-3 opacity-0"}`}
      >
        <ul className="flex flex-col px-6 py-4 text-[16px] tracking-widest text-[#2C0836] uppercase">
          <Link
            className="border-b border-[#2C0836]/10 py-4 hover:text-[#2A0A5B] hover:font-bold"
            href="/Homepage"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="border-b border-[#2C0836]/10 py-4 hover:text-[#2A0A5B] hover:font-bold"
            href="/about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            className="border-b border-[#2C0836]/10 py-4 hover:text-[#2A0A5B] hover:font-bold"
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            className="flex items-center gap-3 py-4 hover:text-[#2A0A5B]"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/replay.png"
              width={30}
              height={30}
              alt="replay video"
            />
            Replay
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
