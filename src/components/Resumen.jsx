import React, { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Resumen = ({ onToggleResumen, showResumen }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <li className="flex flex-col items-center p-4 border-b-[1px] border-[#022933] resumen">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img
          className="w-8"
          src="/imagenes-tarjetas/iconoC3.svg"
          alt="Icono Resumen"
        />
        <span className="text-base">Resumen de tu viaje</span>
        <button onClick={onToggleResumen}>
          <img
            className={`w-4 transition-transform duration-500 ${
              showResumen ? "rotate-180" : "rotate-0"
            }`}
            src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg"
            alt="Abrir Detalles"
          />
        </button>
      </div>

      <div
        className={`w-full mt-4 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${
          showResumen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="lg:w-[65%] xs:w-full border border-black rounded-3xl">
          <div className="bg-[#383838] rounded-t-2xl py-6 text-white text-center">
            Confirma y paga
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Tu viaje</span>
              <span className="creatoLight">
                Entras 14 agosto
                <br />
                Sales 29 agosto
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Número de huéspedes:</span>
              <span className="creatoLight">10</span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex flex-col items-center justify-between border-b border-black border-opacity-25">
              <span className="creatoBold text-xl">Precio por noche:</span>
              <span className="creatoLight">$ 2.500 USD</span>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="p-4 w-[80%] flex items-center justify-between">
              <span className="creatoBold text-xl">Total:</span>
              <span className="creatoLight">$ 7.500 USD</span>
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
