import React, { useRef, useEffect, useState } from "react";
import data from "../assets/data";
import { gsap } from "gsap";
import Tarjeta from "./Tarjeta"; // Asegúrate de importar el componente Tarjeta

const tiempo = [
  { Terraza: [3, 17] },
  { "Habitación secundaria": [25, 38] },
  { Cocina: [40, 51] },
  { Piscina: [61, 83] },
  { "Habitación principal": [88, 95] },
  { Comedor: [98, 105] },
  { Exteriores: [110, 132] },
];

const nombres = tiempo.map((obj) => Object.keys(obj)[0]);

const Menu = ({
  onButtonClick,
  isPlaying,
  handleClickAudio,
  audioRef,
  handleShowReserva,
}) => {
  const [hover, setHover] = useState(false);
  const [selectedTarjeta, setSelectedTarjeta] = useState(null);
  const refs = useRef(
    nombres.reduce((acc, value) => {
      acc[value] = {
        imageRef: React.createRef(),
        buttonRef: React.createRef(),
        verMasRef: React.createRef(),
      };
      return acc;
    }, {})
  );

  const handleDotClick = (index) => {
    const tarjetaData = data.find((item) => item.title === nombres[index]);
    if (tarjetaData) {
      setSelectedTarjeta({
        ...tarjetaData,
        images: tarjetaData.images || [],
      });
    }
  };

  useEffect(() => {
    const showImage = (imageRef, start, sumaTotal, buttonRef, verMasRef) => {
      const tl = gsap.timeline();

      tl.to([imageRef.current, verMasRef.current], {
        opacity: 1,
        pointerEvents: "all",
        scale: 1.2,
        duration: 0.5,
        delay: start,
      })
      .to(buttonRef.current, {
        opacity: 0.7,
        scale: 1.2,
        duration: 0.5,  // Igual duración
        ease: "easeInOut",
        color: "white",
      }, `-=0.5`)  // Comienza simultáneamente con el primer .to de imageRef y verMasRef
      .to([imageRef.current, verMasRef.current], {
        pointerEvents: "none",
        opacity: 0,
        scale: 1,
        duration: 1,
        delay: sumaTotal - start,
      }, `+=0`)
      .to(buttonRef.current, {
        opacity: 0.5,
        scale: 1,
        duration: 1,  // Igual duración
        ease: "easeInOut",
        color: "white",
      }, `-=1`);  // Comienza simultáneamente con el segundo .to de imageRef y verMasRef
    };

    const video = document.querySelector("video");

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      tiempo.forEach((obj) => {
        const key = Object.keys(obj)[0];
        const [start, end] = obj[key];

        const resta = end - start;
        const imageRef = refs.current[key]?.imageRef;
        const buttonRef = refs.current[key]?.buttonRef;
        const verMasRef = refs.current[key]?.verMasRef;

        if (currentTime >= start && currentTime < end) {
          showImage(imageRef, 0, resta, buttonRef, verMasRef);
        }
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    onButtonClick(buttonName);
  };

  return (
    <div
      className="fixed bottom-24 left-0 w-full text-[--bg] transition-colors duration-500 ease-out z-[51]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-center py-4">
        <div className="w-[65%] flex flex-wrap justify-around items-center">
          {nombres.map((nombre) => {
            const tarjetaData = data.find((item) => item.title === nombre);
            return (
              <div key={nombre} className="relative flex flex-col items-center">
                <div
                  ref={refs.current[nombre].imageRef}
                  className="opacity-0 pointer-events-none absolute bottom-full transition-opacity flex flex-col items-center"
                >
                  <div className="grid grid-cols-1 gap-1 w-[18px]">
                    <img
                      src={tarjetaData.icono}
                      alt={`${nombre.replace(/_/g, " ")} icon`}
                      className="h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>
                <button
                  ref={refs.current[nombre].buttonRef}
                  onClick={() => handleButtonClick(nombre)}
                  className="hover:text-[#0090b2] transition-colors mt-4 text-button opacity-40 flex flex-col items-center"
                >
                  {nombre
                    .replace(/_/g, " ")
                    .split(" ")
                    .map((word, index) => (
                      <span key={index} className="leading-none">
                        {word}
                      </span>
                    ))}
                </button>
                <button
                  ref={refs.current[nombre].verMasRef}
                  className="w-20 bg-[#f4efdf3d] hover:bg-[--bg] text-[--bg] hover:text-[#022933] text-xs mt-2 rounded-md opacity-0 pointer-events-none"
                  onClick={() => handleButtonClick(nombre)}
                >
                  Ver más
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[75%] border-t-2 border-[--bg] opacity-40 mx-auto mt-0 lineaTiempo"></div>

      {/* Mostrar Tarjeta si está seleccionada */}
      {selectedTarjeta && (
        <Tarjeta
          images={selectedTarjeta.images}
          title={selectedTarjeta.title}
          desTarjeta={selectedTarjeta.desTarjeta}
          description={selectedTarjeta.description}
          onClose={() => setSelectedTarjeta(null)}
          onDotClick={handleDotClick}
        />
      )}
    </div>
  );
};

export default Menu;
