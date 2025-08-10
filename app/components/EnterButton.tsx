import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface EnterButtonProps {
  onClick: () => void;
}

const EnterButton: React.FC<EnterButtonProps> = ({ onClick }) => {
  const buttonVariants = {
    initial: { y: -300, scale: 0 },
    animate: { y: 0, scale: 1 },
  };

  const autoClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the automatic click
  const handleAutoClick = () => {
    onClick(); // Trigger the button click action
  };

  // Set a timeout to automatically trigger 
  useEffect(() => {
    autoClickTimeoutRef.current = setTimeout(() => {
      handleAutoClick();
    }, 15000); // 9 seconds in milliseconds

    // Clear the timeout if the user interacts with the button
    const buttonElement = document.querySelector('.enter-button');
    if (buttonElement) {
      buttonElement.addEventListener('click', () => {
        if (autoClickTimeoutRef.current) {
          clearTimeout(autoClickTimeoutRef.current);
        }
      });
    }

    // Clean up the timeout and event listener on component unmount
    return () => {
      if (autoClickTimeoutRef.current) {
        clearTimeout(autoClickTimeoutRef.current);
      }
      if (buttonElement) {
        buttonElement.removeEventListener('click', () => {
          if (autoClickTimeoutRef.current) {
            clearTimeout(autoClickTimeoutRef.current);
          }
        });
      }
    };
  }, [onClick]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-40 bg-black">
{/* updated */}
 <motion.button
  {...({
    className:
      "text-white/50 hover:text-white bg-[#562864]/50 hover:bg-[#562864]/30 duration-500 ease-in-out h-20 px-8 rounded-full text-base font-bold z-40 enter-button tracking-wide",
    onClick,
    initial: "initial",
    animate: "animate",
    variants: buttonVariants,
    transition: { duration: 0 },
  } as React.ComponentProps<typeof motion.button>)}
>
  ENTER
</motion.button>

      
    </div>
  );
};

export default EnterButton;
