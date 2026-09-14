'use client'

import React, { useEffect, useState } from 'react';

interface SecondVideoProps {
  onVideoEnd: () => void;
}

const SecondVideo: React.FC<SecondVideoProps> = ({ onVideoEnd }) => {
  const [androidPortrait, setAndroidPortrait] = useState(false);

  useEffect(() => {
    const update = () => {
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isPortraitPhone = window.matchMedia(
        '(orientation: portrait) and (max-width: 767px)'
      ).matches;
      setAndroidPortrait(isAndroid && isPortraitPhone);
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return (
    <div className="video-container bg-black overflow-hidden">
      <video
        autoPlay
        className={`w-screen h-screen object-cover [@media(orientation:portrait)_and_(max-width:767px)]:object-contain ${
          androidPortrait ? 'scale-[1.22]' : ''
        }`}
        onEnded={onVideoEnd}
      >
        <source src="/second.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SecondVideo;
