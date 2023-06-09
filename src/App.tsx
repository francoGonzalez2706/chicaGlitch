import "./styles.css";
import AnimatedElement from "./AnimatedElement";
import { useState } from "react";
import InitExperince from "./InitExperince";

export default function App() {
  const [experince, setExperince] = useState(true);
  return (
    <div className="Container-App">
      {experince ? (
        <button className="ButtonExperience" onClick={() => setExperince(false)}>Empezar Experiencia</button>
      ) : (
        <InitExperince />
      )}
    </div>
  );
}
