import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import estadoReserva from "../store/reserva";

const Cuantos = ({ showCuantos, toggleCuantos, ChangeCuantos }) => {
  const snap = useSnapshot(estadoReserva);

  const handleIncrement = (campo) => {
    if (estadoReserva[campo] < 15) {
      estadoReserva[campo] += 1;
    }
  };

  const handleDecrement = (campo) => {
    if (estadoReserva[campo] > 0) {
      estadoReserva[campo] -= 1;
    }
  };

  const handleReset = () => {
    estadoReserva.adultos = 0;
    estadoReserva.niños = 0;
    estadoReserva.bebes = 0;
  };

  useEffect(() => {
    estadoReserva.totalHuespedes = snap.adultos + snap.niños + snap.bebes;
  }, [snap.adultos, snap.niños, snap.bebes]);

  const getCardContent = () => {
    return (
      <div className="px-4">
        <h2 className="text-base creatoLight">Huéspedes</h2>
        <div className="flex flex-col space-y-4 mt-4 px-4">
          <div className="flex items-center justify-between">
            <div className=" flex flex-col">
              <span>Adultos</span>
              <span className=" text-[10px]">13 años en adelante</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement("adultos")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                -
              </button>
              <span className="px-4">{snap.adultos}</span>
              <button
                onClick={() => handleIncrement("adultos")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" flex flex-col">
              <span>Niños</span>
              <span className=" text-[10px]">Edad 2 a 12 años</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement("niños")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                -
              </button>
              <span className="px-4">{snap.niños}</span>
              <button
                onClick={() => handleIncrement("niños")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className=" flex flex-col">
              <span>Bebés</span>
              <span className=" text-[10px]">Edad 0 a 2 (Gratis)</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement("bebes")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                -
              </button>
              <span className="px-4">{snap.bebes}</span>
              <button
                onClick={() => handleIncrement("bebes")}
                className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleReset}
            className="w-32 text-sm border mr-4 border-[#022933] rounded-2xl"
          >
            Restablecer
          </button>
          <button
            onClick={ChangeCuantos}
            className="w-32 text-sm bg-[#88A198] text-white rounded-2xl"
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  };

  return (
    <li className="relative flex flex-col items-center justify-between p-4 border-b-[1px] border-[#022933] h-auto cuantos">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full mb-8">
        <img
          className="w-8"
          src="/imagenes-tarjetas/iconoC2.svg"
          alt="Icono Cuantos"
        />
        <span className="text-base">¿Quiénes vendrán?</span>
        <button onClick={toggleCuantos}>
          {showCuantos ? (
            "Cerrar"
          ) : (
            <img
              className="w-4"
              src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg"
              alt="Abrir Cuantos"
            />
          )}
        </button>
      </div>

      <div
        className={`w-full mt-0 transition-height duration-500 ease-in-out ${
          showCuantos ? "h-[350px]" : "h-0"
        } overflow-hidden`}
      >
        <div className="relative flex flex-col justify-center items-center w-full h-full">
          <div className="absolute sm:w-[75%] w-full h-[320px] rounded-3xl shadow-[10px_-8px_10px_-5px_rgba(0,0,0,0.3)] cursor-pointer border border-[#022933] border-opacity-10 transition-transform duration-500 bg-[#F4EFDF] z-30">
            <div className="p-4">
              {getCardContent()}{" "}
              {/* Llamamos directamente la función para obtener el contenido de la carta */}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Cuantos;
