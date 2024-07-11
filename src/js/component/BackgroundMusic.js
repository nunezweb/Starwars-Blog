import React, { useEffect } from "react";
import TheImperialMarch from "../../sound/the-imperial-march.mp3";

const BackgroundMusic = () => {
  useEffect(() => {
    const BackgroundAudio = new Audio(TheImperialMarch);
    BackgroundAudio.loop = true; // Agregar esta línea si quieres que la música se repita
    BackgroundAudio.play().catch((error) => {
      console.error("Error playing the audio file:", error);
    });

    // Cleanup function to pause the audio when the component unmounts
    return () => {
      BackgroundAudio.pause();
      BackgroundAudio.currentTime = 0; // Reiniciar el audio al desmontar
    };
  }, []); // Empty dependency array to run once on mount

  return null; // No mostrar ningún contenido
};

export default BackgroundMusic;
