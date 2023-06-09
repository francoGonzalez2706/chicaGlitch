import React from "react";
import "./styles.css";
import AnimatedElement from "./AnimatedElement";

export default function InitExperince() {
  return (
    <div className="App">
      <div className="container-Titulo">
        <p className="glitch">
          <span aria-hidden="true">
            Glitch con sonido en el mouse enter and click
          </span>
          Glitch con sonido en el mouse enter and click
          <span aria-hidden="true">
            Glitch con sonido en el mouse enter and click
          </span>
        </p>
      </div>
      <AnimatedElement
        imageUrl="https://simulation.smartraining.cl/sims/ripley/personaje.png"
        imageActiveUrl="https://simulation.smartraining.cl/sims/ripley/chica_pensando.png"
        backgroundUrl="https://simulation.smartraining.cl/sims/ripley/fondo.jpg"
        backgroundActiveUrl="https://simulation.smartraining.cl/sims/ripley/chicapensando_holografica.png"
        top={0}
        left={0}
      />
    </div>
  );
}
