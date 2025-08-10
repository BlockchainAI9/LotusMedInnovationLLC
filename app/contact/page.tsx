"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const Contact = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "true");
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mumbai.jpg"
          alt="Contact background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* ===== Mobile (stacked) ===== */}
      <div
        className="relative z-10 md:hidden px-4 pt-28 pb-28 space-y-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Contact Info */}
        <div className="bg-black/40 rounded-xl p-6 text-white w-full max-w-md mx-auto">
          <h2 className="text-2xl font-light mb-6">Contact Us</h2>
          <div className="mb-6">
            <p className="text-lg font-medium">Lotus Med Innovation LLC</p>
          </div>
          <div className="mb-4">
            <h3 className="font-light text-sm">Address:</h3>
            <p className="text-sm leading-relaxed">
              369 S Doheny Dr., PH 132<br />
              Beverly Hills, CA 90211<br />
              U.S.A.
            </p>
          </div>
          <div>
            <h3 className="font-light text-sm">Email:</h3>
            <p className="text-sm underline">lmiglocapital@gmail.com</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          {!scriptLoaded ? (
            <Skeleton className="w-full h-[420px] rounded-lg bg-white/10" />
          ) : (
            <div className="w-full">
              <div className="elfsight-app-5ea2e3a0-1943-4f8d-a113-6b2876a71a66" />
            </div>
          )}
        </div>
      </div>

      {/* ===== Desktop / Tablet (positioned) ===== */}
      {/* Contact Info - Far Left Center */}
      <div className="hidden md:block absolute bottom-40 left-6  z-10">
     <div className="w-full flex-col items-center text-center z-10 ">
              {/* ITEM */}
              <div className="py-2 md:py-4 ">
                <h2 className="text-white font-[300] text-[21px]">
                  Contact Us
                </h2>
                <p className="text-[15px] pt-6">Lotus Med Innovation LLC</p>
              </div>
              {/* ITEM */}
              <div className="py-2 md:py-4  flex gap-1 justify-center">
                <h2 className="text-white text-[15px] font-[300] ">Address:</h2>
                <p className="text-[15px] flex flex-col text-center font-[300]">
                  369 S Doheny Dr., PH 132<span>Beverly Hills, CA 90211</span>
                  <span>U.S.A.</span>{" "}
                </p>
              </div>
              {/* ITEM */}
              <div className="py-2 md:py-1  flex gap-1 justify-center">
                <h2 className="text-white font-[300] text-[15px]">Email:</h2>
                <p className="text-[15px] text-[#fff] font-[300] underline">
                  lmiglocapital@gmail.com
                </p>
              </div>
            </div>
      </div>

         <div className="bg-black/40 rounded-xl p-6 md:p-8 text-white max-w-sm w-full text-left">
          <h2 className="text-white font-[300] text-[21px]">Contact Us</h2>
            <p className="text-[15px] pt-6">Lotus Med Innovation LLC</p>
          
          <div className="mb-4">
            <h3 className="font-light text-sm">Address:</h3>
            <p className="text-sm leading-relaxed">
              369 S Doheny Dr., PH 132<br />
              Beverly Hills, CA 90211<br />
              U.S.A.
            </p>
          </div>
          <div>
            <h3 className="font-light text-sm">Email:</h3>
            <p className="text-sm underline">lmiglocapital@gmail.com</p>
          </div>
        </div>

      

      {/* Contact Form - Far Right Bottom */}
      <div className="hidden md:block absolute bottom-6 right-6 z-10 w-[min(90vw,640px)]">
        {!scriptLoaded ? (
          <Skeleton className="w-full h-[500px] rounded-lg bg-white/10" />
        ) : (
          <div className="w-full elfsight-wrapper">
            <div className="elfsight-app-5ea2e3a0-1943-4f8d-a113-6b2876a71a66" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-white text-xs z-10">
        © {new Date().getFullYear()} Lotus Med Innovation LLC. <br /> All Rights Reserved.
      </div>
    </section>
  );
};

export default Contact;
