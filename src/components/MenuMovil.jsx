import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

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
  const refs = useRef(
    items.reduce((acc, item) => {
      acc[item.nombre] = {
        imageRef: React.createRef(),
        buttonRef: React.createRef(),
        verMasRef: React.createRef(),
      };
      return acc;
    }, {})
  );

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const showImage = (imageRef, start, duration, buttonRef, verMasRef) => {
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

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de desplazamiento
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Detectar el botón centrado
    const buttons = Array.from(containerRef.current.children[0].children);
    let closest = null;
    let closestDistance = Infinity;
    buttons.forEach((button) => {
      const box = button.getBoundingClientRect();
      const centerDistance = Math.abs(box.left + box.width / 2 - window.innerWidth / 2);
      if (centerDistance < closestDistance) {
        closestDistance = centerDistance;
        closest = button;
      }
    });
    if (closest) {
      const nombre = closest.querySelector("button").innerText.replace(/ /g, "_");
      handleButtonClick(nombre);

      const imageRef = refs.current[nombre]?.imageRef;
      const buttonRef = refs.current[nombre]?.buttonRef;
      const verMasRef = refs.current[nombre]?.verMasRef;

      showImage(imageRef, 0, 6, buttonRef, verMasRef);
    }
  };

  return (
    <div
      className="fixed bottom-20 left-0 w-full text-[--bg] transition-colors duration-500 ease-out z-[51] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex justify-center pt-28 pb-8 w-full no-scrollbar"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-start items-center w-full">
          {items.map((item) => (
            <div
              key={item.nombre}
              className="relative flex flex-col items-center min-w-[100vw]"
            >
              <img
                ref={refs.current[item.nombre].imageRef}
                src={item.icono}
                alt={item.nombre}
                className="h-10 w-10 object-contain opacity-0 pointer-events-none transition-all duration-500 ease-in-out"
              />

              <button
                ref={refs.current[item.nombre].buttonRef}
                onClick={() => handleButtonClick(item.nombre)}
                className="hover:text-[#0090b2] transition-colors mt-4 text-button opacity-40 flex flex-col items-center"
              >
                <span>{item.nombre.replace(/_/g, " ")}</span>
              </button>

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
