import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export const IconoLink = ({ refe }) => {
  const container = useRef();
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".Circle",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.5,
          repeat: -1,
          stagger: 0.3,
        }
      );
    },
    { scope: container }
  );

  return (
    <figure ref={refe} className="w-[18%] mr-6 h-full inline-block">
      <svg
        className="w-full h-full object-contain"
        ref={container}
        id="uuid-f948c90b-94c4-4b1e-ba0b-159d94586150"
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 95.38 95.38"
      >
        <circle
          className="Circle"
          cx="47.69"
          cy="47.69"
          r="32.6"
          style={{ fill: "none", stroke: "#fff", strokeMiterlimit: 10 }}
        />
        <circle
          className="Circle"
          cx="47.69"
          cy="47.69"
          r="40.15"
          style={{
            fill: "none",
            stroke: "#fff",
            strokeMiterlimit: 10,
            strokeWidth: "0.5px",
          }}
        />
        <circle
          className="Circle"
          cx="47.69"
          cy="47.69"
          r="47.56"
          style={{
            fill: "none",
            stroke: "#fff",
            strokeMiterlimit: 10,
            strokWidth: "0.25px",
          }}
        />
        <path
          d="m34.23,34.18c-.28,0-.5.22-.5.5s.22.5.5.5h25.19l-26.87,26.87c-.2.2-.2.51,0,.71.1.1.23.15.35.15s.26-.05.35-.15l26.87-26.87v23.65c0,.28.22.5.5.5s.5-.22.5-.5v-25.36h-26.9Z"
          style={{ fill: "#fff", strokeWidth: "0px" }}
        />
      </svg>
    </figure>
  );
};
