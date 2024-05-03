import React, { useEffect, useRef, useState } from 'react';

const BackgroundSound = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = isMuted ? 0 : 1;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <span className="Audio">
      <audio ref={audioRef} src="/MadehTunes.mp3" />
      <img className="AudioImg" src={isMuted ? '/mute.svg' : '/unmute.svg'} onClick={toggleMute}/>
    </span>
  );
};

export default BackgroundSound;
