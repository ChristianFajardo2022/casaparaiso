import React, { useEffect, useRef } from "react";
import imagencerrar from "/imagenes-tarjetas/iconoCerrarAzul.svg";

const Ubicacion = ({ onClose }) => {
  const mapRef = useRef(null);

  useEffect(() => {
   
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 11.2950751, lng: -73.8920037 }, 
      zoom: 2, // Comienza en un zoom bajo
      mapTypeId: window.google.maps.MapTypeId.HYBRID, // Vista híbrida (satélite + etiquetas)
    });

    // Animación de zoom desde 2 hasta 18
    let currentZoom = 2;
    const targetZoom = 18;
    const zoomInterval = setInterval(() => {
      if (currentZoom < targetZoom) {
        currentZoom++;
        map.setZoom(currentZoom);
      } else {
        clearInterval(zoomInterval);
      }
    }, 200); // Ajusta la velocidad de la animación (200 ms entre cada nivel de zoom)
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[55] flex items-center justify-center backdrop-blur-xl bg-gray-900 bg-opacity-35">
              <button onClick={onClose} className="absolute top-[-45px] md:top-4 right-4 md:right-4">
          <img src={imagencerrar} className="w-6 md:w-6" />
        </button>

      <div className="flex flex-col items-center w-full max-w-[90%] md:max-w-[70%] relative  rounded-2xl">
        <div className="w-full h-[300px] md:h-[500px] relative flex items-center justify-center rounded-2xl overflow-hidden">
          <div ref={mapRef} className="w-full h-full rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
