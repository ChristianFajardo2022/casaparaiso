import { proxy } from "valtio";

const estadoReserva = proxy({
  fechaEntrada: null,
  fechaSalida: null,
  adultos: 0,
  niños: 0,
  bebes: 0,
  totalHuespedes: 0,
  precioNoche: 2100, // Valor inicial
  totalEstadia: 0,

  calcularTotalHuespedes() {
    this.totalHuespedes = this.adultos + this.niños + this.bebes;
  },
});

export default estadoReserva;
