import React, { useEffect, useRef, useState } from "react";
import "./AnimatedElement.css"; // Archivo CSS para estilos personalizados

interface AnimateElementProps {
  top: number;
  left: number;
  imageUrl: string; // Agregar prop para la URL de la imagen
  imageActiveUrl: string;
  backgroundUrl: string;
  backgroundActiveUrl: string;
}

const AnimateElement: React.FC<AnimateElementProps> = ({
  top,
  left,
  imageUrl,
  imageActiveUrl,
  backgroundUrl,
  backgroundActiveUrl,
}) => {

  const [activeImage, setActiveImage] = useState(0);
  const [glitchLayerStyle, setglitchLayerStyle] = useState({ backgroundImage: `url(${backgroundUrl})` });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGlitchActive, setIsGlitchActive] = useState(false);

  const handleClick = () => {
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((error) => console.log(error));
    }
  };
  let timeOut: any;
  const handleMouseEnter = () => {
    setIsGlitchActive(true);
    setActiveImage(1);
    setglitchLayerStyle({ backgroundImage: `url(${backgroundActiveUrl})` })
    if (timeOut) {
      clearTimeout(timeOut);
    }
  };

  const handleMouseLeave = () => {
    timeOut =
      setTimeout(() => {
        setIsGlitchActive(false);
        setActiveImage(0);
        setglitchLayerStyle({ backgroundImage: `url(${backgroundUrl})` })
      }, 1000);
  };



  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      audioRef.current.addEventListener("ended", () => {
        setIsAudioPlaying(false);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsAudioPlaying(false);
        });
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (isGlitchActive && audioRef.current && !isAudioPlaying) {

      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((error) => console.log(error));
    }
    if (isGlitchActive && audioRef.current) {
      audioRef.current.volume = 0.05;
    } else if (!isGlitchActive && audioRef.current) {
      audioRef.current.volume = 0;
    }
  }, [isGlitchActive, isAudioPlaying]);


  return (
    <div
      className={`glitch`}
    >
      <div className="image-container " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} style={{ cursor: "pointer" }}>
        <img src={imageUrl} className={`imagen ${activeImage == 0 ? "active" : ""}`} alt="" />
        <img src={imageActiveUrl} className={`imagen ${activeImage == 1 ? "active" : ""}`} alt="" />

      </div>
      <div className={`glitch__layers ${isGlitchActive ? "active" : ""}`}>
        <div className="glitch__layer" style={glitchLayerStyle}></div>
        <div className="glitch__layer" style={glitchLayerStyle}></div>
        <div className="glitch__layer" style={glitchLayerStyle}></div>
      </div>
      <audio
        ref={audioRef}
        src="https://simulation.smartraining.cl/sims/ripley/glitch2.mp3"
      />
    </div>
  );
};

export default AnimateElement;
