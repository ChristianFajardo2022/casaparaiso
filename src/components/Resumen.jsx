import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useSnapshot } from "valtio";
import estadoReserva from "../store/reserva";
import { ButtonWhts } from "./whatsapp/ButtonWhts";

const Resumen = ({ onToggleResumen, showResumen }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);

  const snap = useSnapshot(estadoReserva);

  // Inicializa MercadoPago solo cuando se monta el componente
  useEffect(() => {
    initMercadoPago("APP_USR-6ccaff3f-3e4b-40bc-972e-0fe0785b78ba", {
      locale: "es-CO",
    });
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Crear preferencia al montar el componente
  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/create_preference",
          {
            title: "Casa Paraiso Tayrona",
            quantity: 1,
            price: 2000,
          }
        );
        console.log("Respuesta de crear preferencia:", response.data);
        const { id } = response.data;
        if (!id) {
          throw new Error("No se recibió un ID de la respuesta");
        }
        setPreferenceId(id); // Establecer el ID de la preferencia
        setLoading(false); // Dejar de mostrar el estado de carga
      } catch (error) {
        console.error("Error al crear preferencia:", error);
      }
    };

    createPreference(); // Llama a la función para crear la preferencia
  }, []); // Se ejecuta una vez cuando el componente se monta

  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(!showDetails);
    onToggleResumen();
  };

  useEffect(() => {
    if (snap.fechaEntrada && snap.fechaSalida) {
      const entrada = new Date(snap.fechaEntrada);
      const salida = new Date(snap.fechaSalida);

      const miliSegundos = salida - entrada;

      const Noches = miliSegundos / (1000 * 60 * 60 * 24);

      estadoReserva.totalEstadia = Noches * snap.precioNoche;
    }

    //TODO: faltaria agregar aumento de precio de acuerdo al numero de huespedes que no se
  }, [snap.fechaEntrada, snap.fechaSalida, snap.precioNoche]);

  return (
    <li className="flex flex-col items-center p-4 border-b-[1px] border-[#022933] resumen">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img
          className="w-8"
          src="/imagenes-tarjetas/iconoC3.svg"
          alt="Icono Resumen"
        />
        <span className="text-base">Resumen de tu viaje</span>

        <button onClick={handleToggle}>
          {showResumen ? (
            "Cerrar"
          ) : (
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
                {snap.fechaEntrada}
                <br />
                {snap.fechaSalida}
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
          <div className="w-full flex justify-center">
            <div className="py-4 w-[80%] flex items-center justify-between">
              <button className="border-b border-black">
                Nuestros términos
              </button>
              <button className="border-b border-black">
                Lo que ofrecemos
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="py-4 w-[80%] flex items-center justify-between border-b">
              <span>Acepta términos y condiciones</span>
              <button className="border border-black w-4 h-4"></button>
            </div>
          </div>
        </div>

        {/* Mostrar el botón de Wallet cuando preferenceId esté disponible */}

        <div className="flex flex-col items-center w-full mt-4">
          <ButtonWhts />
        </div>

        <div className="flex flex-col items-center w-full mt-4">
          {!loading && preferenceId ? (
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          ) : (
            <span>Cargando opciones de pago...</span> // Mostrar mientras se carga
          )}
          <span className="mt-2">Paga de forma segura</span>
        </div>
      </div>
    </li>
  );
};

export default Resumen;
