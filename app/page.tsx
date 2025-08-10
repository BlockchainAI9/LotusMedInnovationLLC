'use client'

// pages/index.tsx
import React, { useState } from 'react';
import InitialVideo from './components/InitialVideo';
import EnterButton from './components/EnterButton';
import SecondVideo from './components/SecondVideo'; // Import the SecondVideo component

export default function Home() {
  const [showSecondVideo, setShowSecondVideo] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);

  // Function to be called after the initial video finishes playing
  const handleInitialVideoEnd = () => {
    setShowEnterButton(true);
  };

  // Function to be called after the second video finishes playing
  const handleSecondVideoEnd = () => {
    // Redirect to the "/Homepage" route
    window.location.href = '/Homepage';
  };

  const handleEnterButtonClick = () => {
    setShowSecondVideo(true);
    setShowEnterButton(false);
  };


  //return
  return (
    <main className="w-full h-screen bg-[#100823]">
      {showSecondVideo ? (
        <SecondVideo onVideoEnd={handleSecondVideoEnd} />
      ) : (
        <InitialVideo onVideoEnd={handleInitialVideoEnd} />
      )}
      {showEnterButton && <EnterButton onClick={handleEnterButtonClick} />}
    </main>
  );
}
