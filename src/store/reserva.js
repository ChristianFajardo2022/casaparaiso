import { proxy } from "valtio";

// Función auxiliar para determinar si la fecha está dentro de la temporada alta
const esTemporadaAlta = (fecha) => {
  const month = fecha.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, así que se ajusta a 1-12.
  const day = fecha.getDate();

  // Temporada alta: 15 junio - 15 agosto, 7 - 11 octubre, 15 diciembre - 15 enero
  if (
    (month === 6 && day >= 15) ||
    (month === 7) ||
    (month === 8 && day <= 15) ||
    (month === 10 && day >= 7 && day <= 11) ||
    (month === 12 && day >= 15) ||
    (month === 1 && day <= 15)
  ) {
    return true;
  }
  return false;
};

const estadoReserva = proxy({
  fechaEntrada: null,
  fechaSalida: null,
  adultos: 0,
  niños: 0,
  bebes: 0,
  totalHuespedes: 0,
  precioNoche: 2100, // Precio base inicial
  totalEstadia: 0,

  // Función para calcular el número total de huéspedes
  calcularTotalHuespedes() {
    this.totalHuespedes = this.adultos + this.niños + this.bebes;
    this.calcularPrecioNoche(); // Recalcular el precio por noche cuando cambian los huéspedes
  },

  // Función para calcular el precio por noche basado en el número de huéspedes
  calcularPrecioNoche() {
    const { totalHuespedes, fechaEntrada } = this;

    let precioBase = 2100; // Precio por defecto

    if (totalHuespedes >= 1 && totalHuespedes <= 4) {
      precioBase = 2100;
    } else if (totalHuespedes >= 5 && totalHuespedes <= 6) {
      precioBase = 2000;
    } else if (totalHuespedes >= 7 && totalHuespedes <= 9) {
      precioBase = 2200;
    } else if (totalHuespedes >= 10 && totalHuespedes <= 15) {
      precioBase = 2500;
    }

    // Aumentar el precio en un 20% si es temporada alta
    if (fechaEntrada && esTemporadaAlta(new Date(fechaEntrada))) {
      this.precioNoche = precioBase * 1.2;
    } else {
      this.precioNoche = precioBase;
    }
  },

  // Función para calcular el total de la estadía
  calcularTotalEstadia() {
    if (this.fechaEntrada && this.fechaSalida) {
      const entrada = new Date(this.fechaEntrada);
      const salida = new Date(this.fechaSalida);
      const diffMilisegundos = salida - entrada;
      const noches = diffMilisegundos / (1000 * 60 * 60 * 24);
      this.totalEstadia = noches * this.precioNoche;
    }
  },
});

// Observa cambios en los adultos, niños y bebés para actualizar el total de huéspedes
estadoReserva.adultos = new Proxy(estadoReserva.adultos, {
  set(target, prop, value) {
    Reflect.set(target, prop, value);
    estadoReserva.calcularTotalHuespedes();
    return true;
  },
});

estadoReserva.niños = new Proxy(estadoReserva.niños, {
  set(target, prop, value) {
    Reflect.set(target, prop, value);
    estadoReserva.calcularTotalHuespedes();
    return true;
  },
});

estadoReserva.bebes = new Proxy(estadoReserva.bebes, {
  set(target, prop, value) {
    Reflect.set(target, prop, value);
    estadoReserva.calcularTotalHuespedes();
    return true;
  },
});

export default estadoReserva;
