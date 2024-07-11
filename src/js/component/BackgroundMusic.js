import React, { useEffect } from "react";
import TheImperialMarch from "../../sound/the-imperial-march.mp3";

const BackgroundMusic = () => {
  useEffect(() => {
    const BackgroundAudio = new Audio(TheImperialMarch);
    BackgroundAudio.loop = true; 

    const playAudio = () => {
      BackgroundAudio.play().catch((error) => {
        console.error("Error playing the audio file:", error);
      });
    };

    document.addEventListener('click', playAudio);

    return () => {
      BackgroundAudio.pause();
      BackgroundAudio.currentTime = 0;
      document.removeEventListener('click', playAudio);
    };
  }, []);

  return null; 
};

export default BackgroundMusic;
