import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  full,
  laptop,
  minilaptop,
  mobile,
  tablet,
} from "../helpers/MedidasResponsive";

const Calendario = ({
  handleChangeCard,
  showCalendars,
  toggleCalendars,
  showSalida,
  setShowSalida,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const Movil = mobile || tablet;
  const Destokp = minilaptop || laptop || full;

  const [clickCount, setClickCount] = useState(0);

  const handleDateChange = (date) => {
    // Incrementa el contador de clics
    setClickCount((prevCount) => prevCount + 1);

    // Si es el tercer clic, reiniciar los valores y establecer el nuevo startDate
    if (clickCount >= 4) {
      setStartDate(date);
      setEndDate(null);
      setClickCount(1); // Reiniciar el contador a 1 ya que se seleccionó el nuevo startDate
    }
    // Si no hay startDate definido, la fecha seleccionada es el startDate
    else if (!startDate) {
      setStartDate(date);
    }
    // Si no hay endDate y la fecha seleccionada es mayor al startDate, será el endDate
    else if (!endDate && date > startDate) {
      setEndDate(date);
    }
    // Si la fecha seleccionada es menor al startDate, actualizar el startDate
    else if (date < startDate) {
      setStartDate(date);
    }
    // Si la fecha seleccionada está entre startDate y endDate, será el nuevo endDate
    else if (endDate && date > startDate && date < endDate) {
      setEndDate(date);
    }
    // Si la fecha seleccionada es mayor al endDate, actualizar el endDate
    else if (date > startDate && date > endDate) {
      setEndDate(date);
    }
  };

  return (
    <li className="flex flex-col items-center justify-between p-4 border-b-[1px] border-[#022933] h-auto calendario">
      <div
        onClick={toggleCalendars}
        className="cursor-pointer flex items-center justify-between w-full h-[5vh] sm:h-full"
      >
        <img
          className="w-8"
          src="/imagenes-tarjetas/iconoC1.svg"
          alt="Icono Calendario"
        />
        <span className="text-base">¿Cuándo te podemos recibir?</span>
        <button>
          {showCalendars ? (
            "Cerrar"
          ) : (
            <img
              className="w-4"
              src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg"
              alt="Abrir Calendario"
            />
          )}
        </button>
      </div>

      <div
        className={`w-full mt-8 overflow-hidden transition-all duration-500 ease-in-out ${
          showCalendars
            ? "max-h-[800px] md:max-h-[1000px]" // Ajuste para mostrar correctamente el contenido
            : "max-h-0"
        }`}
      >
        {Destokp && (
          <div className="block border border-opacity-35 border-[#022933] rounded-3xl desktop">
            <div className="flex justify-around mb-0">
              <button
                onClick={() => setShowSalida(false)}
                className={`w-1/2 py-2 rounded-t-3xl rounded-ee-md ${
                  !showSalida
                    ? "bg-[#88A198] text-white"
                    : "bg-[#F4EFDF] text-black"
                }`}
              >
                Llegada
              </button>
              <button
                onClick={() => setShowSalida(true)}
                className={`w-1/2 py-2 rounded-t-3xl ${
                  showSalida
                    ? "bg-[#88A198] text-white"
                    : "bg-[#F4EFDF] text-black"
                }`}
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
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                  monthsShown={2}
                  minDate={new Date()} // Deshabilita fechas anteriores a hoy
                  maxDate={addMonths(new Date(), 12)}
                  dayClassName={
                    (date) =>
                      date < new Date()
                        ? "text-gray-300 cursor-not-allowed"
                        : undefined // Aplicar opacidad a las fechas deshabilitadas
                  }
                />
              ) : (
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  locale={es}
                  inline
                  monthsShown={2}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()} // Salida no puede ser antes de la llegada
                  maxDate={addMonths(new Date(), 12)}
                />
              )}
            </div>
          </div>
        )}

        {Movil && (
          <div
            className={`md:hidden relative  transition-all duration-500 ease-in-out min-h-72`}
          >
            {/* Tarjeta de Llegada */}
            <div>
              <div className="mobile-datepicker bg-[#f4efdf] border border-gray-300 rounded-3xl shadow-md p-4 flex flex-col items-center justify-between">
                <DatePicker
                  selected={startDate || endDate}
                  onChange={handleDateChange}
                  locale={es}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                  monthsShown={1}
                  minDate={new Date()} // Deshabilita fechas anteriores a hoy
                  maxDate={addMonths(new Date(), 12)}
                  dayClassName={
                    (date) =>
                      date < new Date()
                        ? "text-gray-300 cursor-not-allowed"
                        : undefined // Aplicar opacidad a las fechas deshabilitadas
                  }
                />
              </div>
            </div>

            {/* Tarjeta de Salida */}
            {/* <div
              className={`absolute left-0 right-0 transition-all w-[300px] duration-500 ease-in-out ${
                showSalida
                  ? "translate-y-0 z-20"
                  : "translate-y-4 translate-x-16  z-0"
              }`}
            >
              <div className=" bg-green-200 border rounded-lg shadow-md p-4">
                <div className="card-title text-center font-semibold mb-2">
                  Salida
                </div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  locale={es}
                  inline
                  minDate={startDate || new Date()} // Salida no puede ser antes de la llegada
                  maxDate={addMonths(new Date(), 12)}
                  className="movil-calendar"
                />
              </div>
            </div> */}
          </div>
        )}

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
          <button
            onClick={handleChangeCard}
            className="w-32 bg-[#88A198] text-white rounded-2xl ml-2"
          >
            Aceptar
          </button>
        </div>
      </div>
    </li>
  );
};

export default Calendario;
