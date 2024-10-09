import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import estadoReserva from "../store/reserva";
import { format, isValid } from "date-fns";
import { ButtonWhts } from "./whatsapp/ButtonWhts";

const Resumen = ({ onToggleResumen, showResumen }) => {
  const snap = useSnapshot(estadoReserva);

  // Cálculo de la cantidad de huéspedes y ajuste del precio basado en la cantidad
  useEffect(() => {
    const calcularTotalHuespedes = () => {
      const total = snap.adultos + snap.niños + snap.bebes;
      estadoReserva.totalHuespedes = total;
  
      // Ajuste del precio basado en el número de huéspedes y el año de la fecha de entrada
      let precioBase;
      const fechaEntrada = snap.fechaEntrada ? convertirFecha(snap.fechaEntrada) : new Date();
      const añoEntrada = fechaEntrada.getFullYear();
  
      // Precios para 2024
      if (añoEntrada === 2024) {
        if (total >= 1 && total <= 4) {
          precioBase = 1800;
        } else if (total >= 5 && total <= 6) {
          precioBase = 2000;
        } else if (total >= 7 && total <= 9) {
          precioBase = 2200;
        } else if (total >= 10 && total <= 15) {
          precioBase = 2500;
        } else {
          precioBase = 0; // Manejo de caso si se excede el límite
        }
      }
      // Precios para 2025
      else if (añoEntrada === 2025) {
        if (total >= 1 && total <= 4) {
          precioBase = 2100; // Precio base para 2025
        } else if (total >= 5 && total <= 6) {
          precioBase = 2300; // Precio base para 2025
        } else if (total >= 7 && total <= 9) {
          precioBase = 2600; // Precio base para 2025
        } else if (total >= 10 && total <= 15) {
          precioBase = 2900; // Precio base para 2025
        } else {
          precioBase = 0; // Manejo de caso si se excede el límite
        }
      } else {
        precioBase = 0; // Manejo de caso si el año no es 2024 ni 2025
      }
  
      estadoReserva.precioNoche = precioBase;
    };
  
    calcularTotalHuespedes();
  }, [snap.adultos, snap.niños, snap.bebes, snap.fechaEntrada]);
  
  // Cálculo del total de la estadía basado en las fechas
  const convertirFecha = (fechaStr) => {
    if (!fechaStr) return "Fecha no disponible";
    const partes = fechaStr.split(" ");
    const meses = {
      "ene": "01", "feb": "02", "mar": "03", "abr": "04",
      "may": "05", "jun": "06", "jul": "07", "ago": "08",
      "sep": "09", "oct": "10", "nov": "11", "dic": "12"
    };
    const dia = partes[0];
    const mes = meses[partes[1].substring(0, 3).toLowerCase()];
    const año = partes[2];
    if (!mes) return "Fecha no válida";
    const fecha = new Date(`${año}-${mes}-${dia}T00:00:00-05:00`);
    return isNaN(fecha.getTime()) ? "Fecha no válida" : fecha;
  };

  useEffect(() => {
    if (snap.fechaEntrada && snap.fechaSalida) {
      const fechaEntrada = convertirFecha(snap.fechaEntrada);
      const fechaSalida = convertirFecha(snap.fechaSalida);

      if (isValid(fechaEntrada) && isValid(fechaSalida)) {
        const diffTime = fechaSalida - fechaEntrada;
        const noches = diffTime / (1000 * 60 * 60 * 24);

        // Ajuste del precio basado en las fechas del 15 de diciembre de 2024 al 15 de enero de 2025
        const incremento = (fecha) => {
          const inicioAlta = new Date("2024-12-15");
          const finAlta = new Date("2025-01-15");
          return fecha >= inicioAlta && fecha <= finAlta ? 1.2 : 1; // Incremento del 20%
        };

        // Aplicar incremento para ambas fechas
        const factorEntrada = incremento(fechaEntrada);
        const factorSalida = incremento(fechaSalida);

        // Si la estadía incluye noches en el rango de fechas de incremento
        const factor = (factorEntrada + factorSalida) / 2; // Promedio de ambos factores para evitar que se aplique más de una vez
        estadoReserva.totalEstadia = noches * snap.precioNoche * factor;
      }
    }
  }, [snap.fechaEntrada, snap.fechaSalida, snap.precioNoche]);

  return (
    <li className="flex flex-col items-center p-4 resumen">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img className="w-8" src="/imagenes-tarjetas/iconoC3.svg" alt="Icono Resumen" />
        <span className="text-base">Resumen de tu viaje</span>

        <button onClick={onToggleResumen}>
          {showResumen ? "Cerrar" : <img className="w-4" src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" alt="Abrir Cuantos" />}
        </button>
      </div>

      <div className={`w-full mt-4 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${showResumen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="w-full sm:w-[65%] border border-black rounded-3xl">
          <div className="bg-[#383838] rounded-t-2xl py-6 text-white text-center">
            Confirma y paga
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Tu viaje</span>
              <span className="creatoLight">
                {isValid(convertirFecha(snap.fechaEntrada)) ? format(convertirFecha(snap.fechaEntrada), "dd/MM/yyyy") : "Fecha no válida"}
                <br />
                {isValid(convertirFecha(snap.fechaSalida)) ? format(convertirFecha(snap.fechaSalida), "dd/MM/yyyy") : "Fecha no válida"}
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Número de huéspedes:</span>
              <span className="creatoLight">{snap.totalHuespedes}</span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Precio por noche:</span>
              <span className="creatoLight">$ {snap.precioNoche} USD</span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between">
              <span className="creatoBold text-xl">Total:</span>
              <span className="creatoLight">$ {snap.totalEstadia} USD</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <ButtonWhts />
        </div>

      </div>
    </li>
  );
};

export default Resumen;
