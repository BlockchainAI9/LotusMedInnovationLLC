
'use client'

import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';

// Define the prop type for onVideoEnd
interface InitialVideoProps {
  onVideoEnd: () => void;
}

const InitialVideo: React.FC<InitialVideoProps> = ({ onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false); // Add state to track whether the video has played

  const handleUserInteraction = () => {
    setHasUserInteracted(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleSoundToggle = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video && !hasPlayed) { // Check if the video has not played yet
      video.addEventListener('ended', () => {
        setHasPlayed(true); // Set hasPlayed to true when the video ends
        onVideoEnd();
      });

      if (hasUserInteracted) {
        video.play();
      }

      return () => {
        if (video) {
          video.removeEventListener('ended', onVideoEnd);
        }
      };
    }
  }, [onVideoEnd, hasUserInteracted, hasPlayed]);

  return (
    <div className="video-container w-full h-screen" onClick={handleUserInteraction}>
      <video autoPlay muted={isMuted} className="w-screen h-screen object-cover" ref={videoRef}>
        <source src="/first.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {(!hasUserInteracted || !isMuted) && (
        <button
          className="absolute top-2 right-2 bg-gray-400 rounded-full p-2"
          onClick={handleSoundToggle}
        >
          {isMuted ? (
            <img
              src="/mute.png"
              width={25}
              height={25}
              alt="Mute"
            />
          ) : (
            <img
              src="/unmute.png"
              width={25}
              height={25}
              alt="Unmute"
            />
          )}
        </button>
      )}

      <span className='absolute z-40 color-white font-thin text-[16px] tracking-widest bottom-8 left-[50%] translate-x-[-50%] cursor-pointer hover:scale-105 duration-500 ease-in-out uppercase'><Link href={'/Homepage'}>skip to homepage</Link></span>

    </div>
  );
};

export default InitialVideo;
