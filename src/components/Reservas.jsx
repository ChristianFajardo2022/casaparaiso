import React, { useState } from "react";
import Calendario from "./Calendario";
import Cuantos from "./Cuantos";
import Resumen from "./Resumen";
import Consulta from "./Consulta";

const Reserva = ({ onClose, showReserva }) => {
  const [showCalendars, setShowCalendars] = useState(false);
  const [showSalida, setShowSalida] = useState(false);
  const [showCuantos, setShowCuantos] = useState(false);
  const [showResumen, setShowResumen] = useState(false); // Nuevo estado para Resumen
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Verifica si alguna sección está abierta para ajustar la altura
  const isAnySectionOpen =
    showCalendars || showSalida || showCuantos || showResumen;

  const toggleCalendars = () => {
    setShowCalendars(!showCalendars);
    setShowCuantos(false);
    setShowResumen(false);
  };

  const handleChangeCard = () => {
    setShowCuantos(true);
    setShowCalendars(false);
  };

  const ChangeCuantos = () => {
    setShowCuantos(false);
    setShowResumen(true);
  };

  const toggleCuantos = () => {
    setShowCuantos(!showCuantos);
    setShowCalendars(false);
    setShowResumen(false);
  };

  const toggleResumen = () => {
    setShowResumen(!showResumen);
    setShowCalendars(false);
    setShowCuantos(false);
  };

  return (
    <div
      className={`${
        showReserva ? "pointer-events-auto" : "pointer-events-none"
      } absolute w-full h-full bg-white bg-opacity-20 backdrop-blur-2xl z-[55] flex justify-center items-center`}
    >
      <div
        className={`w-full sm:w-[580px] bg-[--bg] rounded-xl shadow-lg transition-all duration-500 ease-in-out overflow-y-auto barra relative ${
          isAnySectionOpen ? "h-full" : "h-full sm:h-auto"
        }`}
      >
        <div className="relative flex flex-col items-center">
          <img
            src="/imagenes-tarjetas/fotoReserva.png"
            alt="Casa Paraíso"
            className="w-full sm:w-[97%] h-[50vh] sm:h-[255px] object-cover object-center sm:mt-2 rounded-t-xl"
          />
          <figure
            onClick={onClose}
            className="cursor-pointer absolute right-4 top-4 w-6 h-6 flex items-center justify-center bg-white bg-opacity-60 rounded-full"
          >
            <img src="/imagenes-tarjetas/cerrargaleria.svg" alt="Cerrar" />
          </figure>
          <div className="absolute bottom-2 left-10">
            <h1 className="text-2xl font-semibold">Reserva</h1>
            <div className="border-l-2">
              <p className=" text-sm mt-2 ml-2">
                Vereda Los Naranjos
                <br />
                Finca Barlovento
                <br />
                Km. 33 vía Rioacha
              </p>
            </div>
            <button className="px-4 py-[2px] text-sm my-4 flex justify-center items-center rounded-2xl bg-[#f4efdf] text-[#022933] hover:bg-[#f4efdf3d]">
              <img
                className="w-2 mr-2"
                src="/imagenes-tarjetas/iconoUbicacion.svg"
              />
              Ubicación
            </button>
          </div>
        </div>

        {/* Contenido que puede desbordarse */}
        <div className="p-4 text-[#022933]">
          <ul className="space-y-2">
            <Calendario
              handleChangeCard={handleChangeCard}
              showCalendars={showCalendars}
              toggleCalendars={toggleCalendars}
              showSalida={showSalida}
              setShowSalida={setShowSalida}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <Cuantos
              showCuantos={showCuantos}
              toggleCuantos={toggleCuantos}
              ChangeCuantos={ChangeCuantos}
            />
            {/* Aquí pasamos la función toggleResumen */}
            <Resumen
              onToggleResumen={toggleResumen}
              showResumen={showResumen}
            />
{/*             <Consulta />
 */}          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
