import React, { useEffect } from "react";
import TheImperialMarch from "../../sound/the-imperial-march.mp3";

const BackgroundMusic = () => {
  useEffect(() => {
    const BackgroundAudio = new Audio(TheImperialMarch);
    BackgroundAudio.loop = true; 
    BackgroundAudio.play().catch((error) => {
      console.error("Error playing the audio file:", error);
    });

    return () => {
      BackgroundAudio.pause();
      BackgroundAudio.currentTime = 0; 
    };
  }, []);

  return null; 
};

export default BackgroundMusic;
