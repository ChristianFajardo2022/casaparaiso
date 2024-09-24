import React from "react";
import imagenLogo from "../../assets/logo.svg";

export const LogoImagen = () => {
  return (
    <figure className="absolute top-12 z-100 left-1/2 -translate-x-1/2 w-52 z-[51]">
      <img src={imagenLogo} alt="" />
    </figure>
  );
};
