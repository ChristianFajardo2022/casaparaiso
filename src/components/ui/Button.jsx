import React from "react";
import { IconoLink } from "../loader/IconoLink";

export const Button = ({
  buRef,
  handleclick,
  title,
  customStyle,
  handleHover,
}) => {
  return (
    <div className="h-full w-full absolute">
      <button
        ref={buRef}
        onClick={handleclick}
        className={`${
          customStyle ? customStyle : ""
        } pointer-events-none -translate-y-16 h-full w-full btnInicio opacity-0 relative flex justify-start items-center blackerMedium z-20 text-white text-6xl`}
      >
        <IconoLink />
        <span className="z-10 w-[70%] text-left">{title}</span>
      </button>
    </div>
  );
};
