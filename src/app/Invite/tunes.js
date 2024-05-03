import React, { useEffect, useRef, useState } from "react";

const BackgroundSound = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = isMuted ? 0 : 1;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted, isPlaying]);

  const toggleMute = () => {
    handlePlay();
    setIsMuted(!isMuted);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <span className="Audio">
      <audio ref={audioRef} src="/MadehTunes.mp3" />
      <img
        className="AudioImg"
        src={isMuted ? "/mute.svg" : "/unmute.svg"}
        onClick={toggleMute}
      />
    </span>
  );
};

export default BackgroundSound;
