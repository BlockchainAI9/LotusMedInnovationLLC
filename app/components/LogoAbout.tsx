
'use client'
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const LogoAbout = () => {
  const animationVariants = {
    initial: {
      opacity: 0,
      y: -165,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0,
        delay: 0.5, // You can adjust the delay as needed
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants}
    >
      <Image
        className="absolute translate-x-[-50%] translate-y-[-50%] top-[20%] left-1/2"
        width={600}
        height={400}
        src="/Logo.png"
        alt="logo"
      />
    </motion.div>
  );
};

export default LogoAbout;
