import React, { useState } from "react";

const Cuantos = ({ showCuantos, toggleCuantos }) => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const handleReset = () => {
    setCounters([0, 0, 0, 0]);
  };

  const handleIncrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  const handleDecrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      if (newCounters[index] > 0) {
        newCounters[index] -= 1;
      }
      return newCounters;
    });
  };

  const getCardContent = () => {
    return (
      <div className="px-4">
        <h2 className="text-base creatoLight">Huéspedes</h2>
        <div className="flex flex-col space-y-4 mt-4 px-4">
          <div className="flex items-center justify-between">
            <span>Adultos</span><span className=" text-[8px]">(13 años en adelante)</span>
            <div className="flex items-center">
              <button onClick={() => handleDecrement(0)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">-</button>
              <span className="px-4">{counters[0]}</span>
              <button onClick={() => handleIncrement(0)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Niños</span>
            <div className="flex items-center">
              <button onClick={() => handleDecrement(1)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">-</button>
              <span className="px-4">{counters[1]}</span>
              <button onClick={() => handleIncrement(1)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Bebés</span>
            <div className="flex items-center">
              <button onClick={() => handleDecrement(2)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">-</button>
              <span className="px-4">{counters[2]}</span>
              <button onClick={() => handleIncrement(2)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">+</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Mascotas</span>
            <div className="flex items-center">
              <button onClick={() => handleDecrement(3)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">-</button>
              <span className="px-4">{counters[3]}</span>
              <button onClick={() => handleIncrement(3)} className="w-6 bg-[#88A198] border border-gray-300 rounded-full">+</button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handleReset} className="w-32 text-sm border mr-4 border-[#022933] rounded-2xl">Restablecer</button>
          <button className="w-32 text-sm bg-[#88A198] text-white rounded-2xl">Aceptar</button>
        </div>
      </div>
    );
  };

  return (
    <li className="relative flex flex-col items-center justify-between p-4 border-b-[1px] border-[#022933] h-auto cuantos">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img className="w-8" src="/imagenes-tarjetas/iconoC2.svg" alt="Icono Cuantos" />
        <span className="text-base">¿Quiénes vendrán?</span>
        <button onClick={toggleCuantos}>
          {showCuantos ? "Cerrar" : <img className="w-4" src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" alt="Abrir Cuantos" />}
        </button>
      </div>

      <div className={`w-full mt-0 transition-height duration-500 ease-in-out ${showCuantos ? 'h-[350px]' : 'h-0'} overflow-hidden`}>
        <div className="relative flex flex-col justify-center items-center w-full h-full">
          <div className="absolute w-[75%] h-[270px] rounded-3xl shadow-[10px_-8px_10px_-5px_rgba(0,0,0,0.3)] cursor-pointer border border-[#022933] border-opacity-10 transition-transform duration-500 bg-[#F4EFDF] z-30">
            <div className="p-4">
              {getCardContent()} {/* Llamamos directamente la función para obtener el contenido de la carta */}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Cuantos;
