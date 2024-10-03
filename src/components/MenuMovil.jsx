import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

// JSON con iconos y nombres
const items = [
  { nombre: "Terraza", icono: "/imagenes-tarjetas/iconoTerraza-18.svg" },
  { nombre: "Habitación_secundaria", icono: "/imagenes-tarjetas/iconoHabitacionSecundiaria-18.svg" },
  { nombre: "Cocina", icono: "/imagenes-tarjetas/iconoCocina.svg" },
  { nombre: "Piscina", icono: "/imagenes-tarjetas/iconoPiscina-18.svg" },
  { nombre: "Habitación_principal", icono: "/imagenes-tarjetas/iconoHabitacionPrincipal.svg" },
  { nombre: "Comedor", icono: "/imagenes-tarjetas/iconoComedor-18.svg" },
  { nombre: "Habitación_auxiliar", icono: "/imagenes-tarjetas/iconoPlaya-18.svg" },
];

const tiempo = [
  { Terraza: [4, 10] },
  { Habitación_secundaria: [14, 20] },
  { Cocina: [23, 29] },
  { Piscina: [34, 39] },
  { Habitación_principal: [52, 56] },
  { Comedor: [63, 66] },
  { Exteriores: [70, 73] },
];

const Menu = ({ onButtonClick }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Para manejar el índice actual
  const refs = useRef(
    items.reduce((acc, item) => {
      acc[item.nombre] = {
        imageRef: React.createRef(),
        buttonRef: React.createRef(),
        verMasRef: React.createRef(), // Ref para el botón "Ver más"
      };
      return acc;
    }, {})
  );

  // Detectar gestos de deslizamiento
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX > endX + 50) {
        // Deslizó a la izquierda (mostrar siguiente)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      } else if (startX < endX - 50) {
        // Deslizó a la derecha (mostrar anterior)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      }
    };

    const container = containerRef.current;
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const showImage = (imageRef, start, duration, buttonRef, verMasRef) => {
      // Mostrar la imagen con gsap
      gsap.to(imageRef.current, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.5,
        delay: start,
        onComplete: () => {
          gsap.to(imageRef.current, {
            pointerEvents: "none",
            opacity: 0,
            duration: 1,
            delay: duration - start,
          });
        },
      });

      // Animación para el nombre del botón
      gsap.to(buttonRef.current, {
        duration: 1.5,
        ease: "easeInOut",
        delay: start,
        opacity: 1,
        color: "white",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            duration: 3,
            opacity: 0.4,
            ease: "easeInOut",
            delay: duration - start,
            color: "white",
          });
        },
      });

      // Animación para el botón "Ver más"
      gsap.to(verMasRef.current, {
        duration: 1.5,
        ease: "easeInOut",
        delay: start,
        opacity: 1,
        onComplete: () => {
          gsap.to(verMasRef.current, {
            duration: 3,
            opacity: 0,
            ease: "easeInOut",
            delay: duration - start,
          });
        },
      });

      // Desplazar el botón al centro de la vista
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
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

  const handleButtonClick = (nombre) => {
    onButtonClick(nombre);
  };

  return (
    <div
      className="fixed bottom-20 left-0 w-full text-[--bg] transition-colors duration-500 ease-out z-[51] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex justify-center pt-28 pb-8 w-full no-scrollbar"
      >
        <div className="flex justify-start items-center w-full">
          {items.map((item, index) => (
            <div
              key={item.nombre}
              className={`relative flex flex-col items-center min-w-[100vw] ${
                currentIndex === index ? "block" : "hidden"
              }`}
            >
              {/* Ícono cargado desde el JSON */}
              <img
                ref={refs.current[item.nombre].imageRef}
                src={item.icono} // Ruta al icono desde el JSON
                alt={item.nombre}
                className="h-10 w-10 object-contain opacity-0 pointer-events-none transition-all duration-500 ease-in-out"
              />

              {/* Nombre del botón */}
              <button
                ref={refs.current[item.nombre].buttonRef}
                onClick={() => handleButtonClick(item.nombre)}
                className="hover:text-[#0090b2] transition-colors mt-4 text-button opacity-40 flex flex-col items-center"
              >
                <span>{item.nombre.replace(/_/g, " ")}</span>
              </button>

              {/* Botón "Ver más" con GSAP */}
              <button
                ref={refs.current[item.nombre].verMasRef}
                className="w-20 bg-[#f4efdf3d] hover:bg-[--bg] text-[--bg] hover:text-[#022933] text-xs mt-2 rounded-md opacity-0 pointer-events-noneduration-500 ease-in-out"
                onClick={() => handleButtonClick(item.nombre)}
              >
                Ver más
              </button>

              <div className="w-[70%] border-t-2 border-[--bg] opacity-40 mx-auto mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
