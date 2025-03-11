import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import estadoReserva from "../store/reserva";
import { format, isValid } from "date-fns";
import { ButtonWhts } from "./whatsapp/ButtonWhts";

const Resumen = ({ onToggleResumen, showResumen }) => {
  const snap = useSnapshot(estadoReserva);

  // Función para convertir la fecha en objeto Date
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

  // ------------------------------------------
  // 1. Determinación de la temporada para 2025
  // ------------------------------------------
  const getTemporada2025 = (fecha) => {
    if (!isValid(fecha)) return "baja"; // Por defecto, consideramos baja si no hay fecha válida

    // Rangos Super Alta
    const inicioSuperAltaSemanaSanta = new Date(2025, 3, 13); // 13 abril 2025
    const finSuperAltaSemanaSanta = new Date(2025, 3, 20);    // 20 abril 2025

    // Fin de año (cruza al 2026)
    const inicioSuperAltaFinAño = new Date(2025, 11, 15); // 15 dic 2025
    const finSuperAltaFinAño = new Date(2026, 0, 14);     // 14 ene 2026

    // Rangos Alta
    const inicioAltaVerano = new Date(2025, 5, 15); // 15 jun 2025
    const finAltaVerano = new Date(2025, 7, 15);   // 15 ago 2025

    const inicioAltaOctubre = new Date(2025, 9, 6); // 6 oct 2025
    const finAltaOctubre = new Date(2025, 9, 10);   // 10 oct 2025

    const inicioAltaDic = new Date(2025, 11, 1);  // 1 dic 2025
    const finAltaDic = new Date(2025, 11, 14);    // 14 dic 2025

    // Chequeo primero Super Alta Fin de Año
    if (fecha >= inicioSuperAltaFinAño && fecha <= finSuperAltaFinAño) {
      return "super_alta_fin_ano";
    }
    // Chequeo Super Alta Semana Santa
    if (fecha >= inicioSuperAltaSemanaSanta && fecha <= finSuperAltaSemanaSanta) {
      return "super_alta_semana_santa";
    }
    // Chequeo Alta (si la fecha de check-in cae en alguno de los rangos de Alta)
    if (
      (fecha >= inicioAltaVerano && fecha <= finAltaVerano) ||
      (fecha >= inicioAltaOctubre && fecha <= finAltaOctubre) ||
      (fecha >= inicioAltaDic && fecha <= finAltaDic)
    ) {
      return "alta";
    }

    // Si no cumple ninguna de las anteriores, es Baja
    return "baja";
  };

  // ---------------------------------------------------
  // 2. Cálculo del precio base por noche según ocupación
  // ---------------------------------------------------
  const getPrecioBase2025 = (totalHuespedes, temporada) => {
    // Temporada Super Alta => precio fijo sin importar huéspedes
    if (temporada === "super_alta_semana_santa") {
      return 4600;
    }
    if (temporada === "super_alta_fin_ano") {
      return 5800;
    }

    // Temporada Alta o Baja => varía según el número de huéspedes
    if (temporada === "alta") {
      if (totalHuespedes >= 1 && totalHuespedes <= 4) return 2520;
      if (totalHuespedes >= 5 && totalHuespedes <= 6) return 2760;
      if (totalHuespedes >= 7 && totalHuespedes <= 9) return 3120;
      if (totalHuespedes >= 10 && totalHuespedes <= 12) return 3480;
      return 0; // Manejo de error si excede 12
    } else {
      // Temporada Baja
      if (totalHuespedes >= 1 && totalHuespedes <= 4) return 2100;
      if (totalHuespedes >= 5 && totalHuespedes <= 6) return 2300;
      if (totalHuespedes >= 7 && totalHuespedes <= 9) return 2600;
      if (totalHuespedes >= 10 && totalHuespedes <= 12) return 2900;
      return 0; 
    }
  };

  // ---------------------------------------------------------
  // 3. useEffect para calcular el total de huéspedes y precio
  // ---------------------------------------------------------
  useEffect(() => {
    const calcularTotalHuespedes = () => {
      const total = snap.adultos + snap.niños + snap.bebes;
      estadoReserva.totalHuespedes = total;

      let precioBase = 0;
      const fechaEntrada = convertirFecha(snap.fechaEntrada);
      const añoEntrada = isValid(fechaEntrada) ? fechaEntrada.getFullYear() : 0;

      // Lógica para 2024 (sin cambios en este ejemplo)
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
          precioBase = 0;
        }
      }
      // Lógica para 2025 con temporadas detalladas
      else if (añoEntrada === 2025) {
        const temporada = getTemporada2025(fechaEntrada);
        precioBase = getPrecioBase2025(total, temporada);
      }
      // Otros años (manejo básico)
      else {
        precioBase = 0;
      }

      estadoReserva.precioNoche = precioBase;
    };

    calcularTotalHuespedes();
  }, [snap.adultos, snap.niños, snap.bebes, snap.fechaEntrada]);

  // -------------------------------------------
  // 4. useEffect para calcular el total estadía
  // -------------------------------------------
  useEffect(() => {
    if (snap.fechaEntrada && snap.fechaSalida) {
      const fechaEntrada = convertirFecha(snap.fechaEntrada);
      const fechaSalida = convertirFecha(snap.fechaSalida);

      if (isValid(fechaEntrada) && isValid(fechaSalida)) {
        const diffTime = fechaSalida - fechaEntrada;
        const noches = diffTime / (1000 * 60 * 60 * 24);

        // Validación mínima de 1 noche
        if (noches <= 0) {
          estadoReserva.totalEstadia = 0;
          return;
        }

        // Verificar si es Super Alta y requiere mínimo 5 noches
        const añoEntrada = fechaEntrada.getFullYear();
        if (añoEntrada === 2025) {
          const temporada = getTemporada2025(fechaEntrada);
          if (
            (temporada === "super_alta_semana_santa" || temporada === "super_alta_fin_ano") 
            && noches < 5
          ) {
            // Si no cumple las 5 noches, podrías poner un mensaje de error o simplemente 0
            estadoReserva.totalEstadia = 0;
            return;
          }
        }

        // Cálculo final (no estamos promediando distintas temporadas; 
        // se asume la misma tarifa para todas las noches)
        estadoReserva.totalEstadia = noches * snap.precioNoche;
      }
    }
  }, [snap.fechaEntrada, snap.fechaSalida, snap.precioNoche]);

  return (
    <li className="flex flex-col items-center p-4 resumen">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img className="w-8" src="/imagenes-tarjetas/iconoC3.svg" alt="Icono Resumen" />
        <span className="text-base">Resumen de tu viaje</span>

        <button onClick={onToggleResumen}>
          {showResumen ? "Cerrar" : (
            <img
              className="w-4"
              src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg"
              alt="Abrir Cuantos"
            />
          )}
        </button>
      </div>

      <div
        className={`w-full mt-4 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${
          showResumen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full sm:w-[65%] border border-black rounded-3xl">
          <div className="bg-[#383838] rounded-t-2xl py-6 text-white text-center">
            Confirma y paga
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Tu viaje</span>
              <span className="creatoLight">
                {isValid(convertirFecha(snap.fechaEntrada))
                  ? format(convertirFecha(snap.fechaEntrada), "dd/MM/yyyy")
                  : "Fecha no válida"}
                <br />
                {isValid(convertirFecha(snap.fechaSalida))
                  ? format(convertirFecha(snap.fechaSalida), "dd/MM/yyyy")
                  : "Fecha no válida"}
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
