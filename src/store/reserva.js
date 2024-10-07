// estado.js
import { proxy } from "valtio";

const estadoReserva = proxy({
  fechaEntrada: null,
  fechaSalida: null,
  adultos: 0,
  niños: 0,
  bebes: 0,
  totalHuespedes: 0,
  precioNoche: 2500,
  totalEstadia: 0,
});

export default estadoReserva;
