import React, { useState } from "react";

const Resumen = ({ onToggleResumen }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(!showDetails);
    onToggleResumen(!showDetails); // Notifica a Reserva si se abrió o cerró
  };

  return (
    <li className="flex flex-col items-center p-4 border-b-[1px] border-[#022933] resumen">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img
          className="w-8"
          src="/imagenes-tarjetas/iconoC3.svg"
          alt="Icono Resumen"
        />
        <span className="text-base">Resumen de tu viaje</span>
        <button onClick={handleToggle}>
          <img
            className={`w-4 transition-transform duration-500 ${
              showDetails ? "rotate-180" : "rotate-0"
            }`}
            src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg"
            alt="Abrir Detalles"
          />
        </button>
      </div>

      <div
        className={`w-full mt-4 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${
          showDetails ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-[65%] border border-black rounded-3xl">
          <div className="bg-[#383838] rounded-t-2xl py-6 text-white text-center">
            Confirma y paga
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl ">Tú viaje</span>
              <span className="creatoLight">
                Entras 14 agosto
                <br />
                Sales 29 agosto
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Número de huéspedes:</span>
              <span className="creatoLight">10</span>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Precio por noche:</span>
              <span className="creatoLight">$ 2.500 USD</span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between">
              <span className="creatoBold text-xl">Total:</span>
              <span className="creatoLight">$ 7.500 USD</span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="py-4 w-[80%] flex items-center justify-between">
              <button className="border-b border-black">Nuestros términos</button>
              <button className="border-b border-black">Lo que ofrecemos</button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="py-4 w-[80%] flex items-center justify-between border-b">
              <span>Acepta términos y condiciones</span>
              <button className="border border-black w-4 h-4"></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <button className="bg-blue-400 w-[40%] text-sm rounded-2xl text-white py-2">
            Pagar con Mercado Pago
          </button>
          <span className="mt-2">Paga de forma segura</span>
        </div>
      </div>
    </li>
  );
};

export default Resumen;
