import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import estadoReserva from "../../store/reserva";

export const ButtonWhts = () => {
  const snap = useSnapshot(estadoReserva);

  useEffect(() => {
    estadoReserva.totalHuespedes = snap.adultos + snap.niños + snap.bebes;
  }, [snap.adultos, snap.niños, snap.bebes]);

  const enviarReserva = () => {
    const mensaje = `
    Hola deseo reservar en Casa Paraiso tayrona para ${snap.adultos} Adultos, ${
      snap.niños > 0 ? snap.niños : 0
    } niños, ${snap.bebes > 0 ? snap.bebes : 0} bebes en las fechas:\n
    Entrada: ${snap.fechaEntrada}\n
    Salida: ${snap.fechaSalida}\n
    Total de Huéspedes: ${estadoReserva.totalHuespedes}\n
    Precio Total de Estadia: $${estadoReserva.totalEstadia}`.trim();

    const numeroWhatsApp = "3203780802";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(urlWhatsApp, "_blank");
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={enviarReserva}
        className="px-4 py-2 bg-[#88A198] text-white rounded-2xl"
      >
        Enviar Reserva
      </button>
    </div>
  );
};
