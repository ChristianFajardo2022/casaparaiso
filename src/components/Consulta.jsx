import React from "react";

const Consulta = () => (
  <li className="flex items-center justify-between p-4 consulta h-[12vh] sm:h-full">
    <img className="w-8" src="/imagenes-tarjetas/iconoC4.svg" />
    <span className="text-base">Consulta tu reserva</span>
    <button className="consulta">
      <img className="w-4" src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" />
    </button>
  </li>
);

export default Consulta;
