// components/loader/RadarLoader.jsx
import React from "react";
import "../RadarLoader.css"; // Asegúrate de importar el CSS específico para la animación del radar

const RadarLoader = () => {
  return (
    <div className="radar-loader ">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  );
};

export default RadarLoader;
