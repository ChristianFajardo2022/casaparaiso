import React from "react";

import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const Calendario = ({ showCalendars, toggleCalendars, showSalida, setShowSalida, startDate, setStartDate, endDate, setEndDate }) => (
  <li className="flex flex-col items-center justify-between p-4 border-b-[1px] border-[#022933] h-auto calendario">
    <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
      <img className="w-8" src="/imagenes-tarjetas/iconoC1.svg" alt="Icono Calendario" />
      <span className="text-base">¿Cuándo te podemos recibir?</span>
      <button onClick={toggleCalendars}>
        {showCalendars ? "Cerrar" : <img className="w-4" src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" alt="Abrir Calendario" />}
      </button>
    </div>

    <div className={`w-full mt-8 overflow-hidden transition-all duration-500 ease-in-out ${showCalendars ? 'max-h-[1000px]' : 'transition-all duration-500 ease-in-out max-h-0'}`}>
      <div className="border border-opacity-35 border-[#022933] rounded-3xl">
        <div className="flex justify-around mb-0">
          <button
            onClick={() => setShowSalida(false)}
            className={`w-1/2 py-2 rounded-t-3xl rounded-ee-md ${!showSalida ? "bg-[#88A198] text-white" : "bg-[#F4EFDF] text-black"}`}
          >
            Llegada
          </button>
          <button
            onClick={() => setShowSalida(true)}
            className={`w-1/2 py-2 rounded-t-3xl ${showSalida ? "bg-[#88A198] text-white" : "bg-[#F4EFDF] text-black"}`}
          >
            Salida
          </button>
        </div>
        <div className="flex custom-datepicker">
          {!showSalida ? (
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setShowSalida(true); // Cambiar automáticamente al calendario de salida
              }}
              locale={es}
              inline
              monthsShown={2}
              minDate={new Date()} // Deshabilita fechas anteriores a hoy
              maxDate={addMonths(new Date(), 12)}
              dayClassName={(date) => 
                date < new Date() ? "text-gray-300 cursor-not-allowed" : undefined // Aplicar opacidad a las fechas deshabilitadas
              }
            />
          ) : (
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              locale={es}
              inline
              monthsShown={2}
              minDate={startDate || new Date()} // Salida no puede ser antes de la llegada
              maxDate={addMonths(new Date(), 12)}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-4">
        <button
          className="w-32 border border-[#022933] rounded-2xl mr-2"
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            setShowSalida(false); // Reiniciar al calendario de llegada
          }}
        >
          Restablecer
        </button>
        <button className="w-32 bg-[#88A198] text-white rounded-2xl ml-2">Aceptar</button>
      </div>
    </div>
  </li>
);

export default Calendario;
