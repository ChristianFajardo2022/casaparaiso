import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export const Audio = ({ isPlaying, active, hover }) => {
  const animationsRef = useRef([]);

  const containerRef = useRef(null);

  const getRandomHeights = () => {
    return Array.from(
      { length: 10 },
      () => `${Math.floor(Math.random() * 40) + 5}%`
    );
  };

  const getRandomDelay = () => Math.random() * 0.5; // Retraso aleatorio entre 0 y 0.5 segundos

  useGSAP(
    () => {
      const elements = containerRef.current.children;

      const animateElements = () => {
        const randomHeights = getRandomHeights();
        animationsRef.current = Array.from(elements).map((element, index) => {
          return gsap.fromTo(
            element,
            { height: "20%" },
            {
              height: randomHeights[index],
              duration: 0.3, // Duración aumentada para suavizar la animación
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: getRandomDelay(), // Retraso aleatorio
              paused: isPlaying, // Inicialmente en pausa si isPaused es true
            }
          );
        });
      };
      animateElements();

      return () => {
        // Cleanup GSAP animations on component unmount
        animationsRef.current.forEach((animation) => animation.kill());
      };
    },
    { scope: containerRef, dependencies: isPlaying }
  );

  useEffect(() => {
    if (!isPlaying) {
      animationsRef.current.forEach((animation) => animation.pause());
    } else {
      animationsRef.current.forEach((animation) => animation.play());
    }
  }, [isPlaying]);

  return (
    <>
      <span
        ref={containerRef}
        className=" w-full h-full flex items-center justify-between"
      >
        {Array.from({ length: 10 }, (_, index) => (
          <span
            key={index + 1}
            className={`${hover ? "bg-[--primary]" : ""}  ${
              active ? "bg-[--primary]" : ""
            } bg-white w-[0.2rem] h-1/2 rounded-full linea${index + 1}`}
          />
        ))}
      </span>
    </>
  );
};
