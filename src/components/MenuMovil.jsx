import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import data from "../assets/data"; // Importamos los datos como en el componente Menu
import Tarjeta from "./Tarjeta"; // Importamos el componente Tarjeta

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tiempo = [
  { Terraza: [3, 17] },
  { Habitación_secundaria: [25, 38] },
  { Cocina: [40, 51] },
  { Piscina: [61, 83] },
  { Habitación_principal: [88, 95] },
  { Comedor: [98, 105] },
  { Exteriores: [110, 132] },
];

function MenuMovil() {
  const sliderRef = useRef(null); // Referencia al slider
  const [currentSlide, setCurrentSlide] = useState(0); // Para controlar la slide actual
  const [selectedTarjeta, setSelectedTarjeta] = useState(null); // Para manejar la tarjeta seleccionada

  // Maneja el tiempo de reproducción del video
  useEffect(() => {
    const video = document.querySelector("video"); // Obtiene el video

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // Recorremos la variable tiempo y verificamos en qué intervalo de tiempo estamos
      tiempo.forEach((obj, index) => {
        const [start, end] = Object.values(obj)[0];
        if (currentTime >= start && currentTime < end) {
          setCurrentSlide(index); // Actualiza el estado para el div actual
          sliderRef.current.slickGoTo(index); // Desliza el slider al div correcto
        }
      });
    };

    // Añadimos el listener de tiempo al video
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      // Limpiamos el listener cuando el componente se desmonta
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleVerMasClick = (index) => {
    setSelectedTarjeta(data[index]); // Abre la tarjeta correspondiente al índice
  };

  const handleCloseTarjeta = () => {
    setSelectedTarjeta(null); // Cierra la tarjeta
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1, // Solo muestra un slide a la vez
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next), // Actualiza el estado cuando el usuario desliza manualmente
  };

  return (
    <div className="slider-container fixed bottom-28 w-full z-[51]">
      <Slider ref={sliderRef} {...settings}>
        {data.map((tarjeta, index) => (
          <div key={index} className="flex">
            <div className="w-full flex flex-col justify-center items-center">
              <img
                className="w-8"
                src={tarjeta.icono}
                alt={`${tarjeta.title} icon`}
              />
              <h3
                className="w-auto mt-2 cursor-pointer"
                onClick={() => handleVerMasClick(index)}
              >
                {tarjeta.title}
              </h3>
              <button
                className="w-24 bg-[#f4efdf3d] hover:bg-[--bg] text-[--bg] hover:text-[#022933] text-xs mt-2 rounded-md"
                onClick={() => handleVerMasClick(index)} // Abre la tarjeta correspondiente
              >
                Ver más
              </button>
            </div>
            <div className="w-[75%] border-t-2 border-[--bg] opacity-40 mx-auto mt-4 lineaTiempo"></div>
          </div>
        ))}
      </Slider>
      {selectedTarjeta && ( // Muestra la tarjeta si está abierta
        <Tarjeta
          images={selectedTarjeta.images}
          title={selectedTarjeta.title}
          desTarjeta={selectedTarjeta.desTarjeta}
          description={selectedTarjeta.description}
          onClose={handleCloseTarjeta} // Manejador para cerrar la tarjeta
          className="z-[60]" // Establecemos el z-index de la tarjeta
        />
      )}
    </div>
  );
}

export default MenuMovil;
