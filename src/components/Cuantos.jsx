import React, { useState } from "react";

const Cuantos = ({ showCuantos, toggleCuantos }) => {
  const [contents, setContents] = useState([
    "inputs",
    "card1",
    "card2",
  ]);

  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const handleAccept = () => {
    setContents((prevContents) => {
      return [
        prevContents[1],
        prevContents[2],
        prevContents[0],
      ];
    });
  };

  const handleReset = () => {
    setCounters([0, 0, 0, 0]);
  };

  const handleIncrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters[index] += 1;
      return newCounters;
    });
  };

  const handleDecrement = (index) => {
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      if (newCounters[index] > 0) {
        newCounters[index] -= 1;
      }
      return newCounters;
    });
  };

  const getCardContent = (content, index) => {
    // Determinamos si el texto debe ser blanco
    const isWhiteText = index === 1 || index === 2;

    const textClass = isWhiteText ? "blanco" : "";

    if (content === "inputs") {
      return (
        <div className="px-4">
          <h2 className={`text-base creatoLight ${textClass}`}>¿A quién esperamos?</h2>
          <form className="flex flex-col space-y-2 mt-4 px-8">
            <input
              className="border-b text-sm border-[#022933] border-opacity-10 placeholder:text-[#022933] placeholder:opacity-70 p-1 bg-transparent"
              type="text"
              placeholder="Nombre completo"
            />
            <input
              className="border-b text-sm border-[#022933] border-opacity-10 placeholder:text-[#022933] placeholder:opacity-70 p-1 bg-transparent"
              type="text"
              placeholder="Número de contacto"
            />
            <input
              className="border-b text-sm border-[#022933] border-opacity-10 placeholder:text-[#022933] placeholder:opacity-70 p-1 bg-transparent"
              type="text"
              placeholder="Número de identificación"
            />
            <input
              className="border-b text-sm border-[#022933] border-opacity-10 placeholder:text-[#022933] placeholder:opacity-70 p-1 bg-transparent"
              type="email"
              placeholder="Correo"
            />
          </form>
          <div className="flex justify-center  mt-8">
            <button className="w-32 border text-sm border-[#022933] border-opacity-35 rounded-2xl mr-4">Restablecer</button>
            <button
              onClick={handleAccept}
              className="w-32 text-sm bg-[#88A198] text-white rounded-2xl"
            >
              Aceptar
            </button>
          </div>
        </div>
      );
    } else if (content === "card1") {
      return (
        <div className="px-4">
          <h2 className={`text-base creatoLight ${textClass}`}>Animales de servicio</h2>
          <p className="creatoLight text-sm mt-4 px-4">Los animales de servicio no se consideran mascotas,
          así que no hace falta que los agregues aquí.</p>
          <p className="creatoLight text-sm mt-4 px-4">¿Viajas con un animal de apoyo emocional? Consulta nuestra politica de accesibilidad.</p>
          <button onClick={handleAccept} className=" w-full flex justify-center items-center mt-4"> <img className=" w-4 rotate-[270deg] " src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" alt="" /></button>
        </div>
      );
    } else if (content === "card2") {
      return (
        <div className=" px-4">
          <h2 className={`text-base  creatoLight ${textClass}`}>Huespedes</h2>
          <div className="flex flex-col space-y-4 mt-4 px-4">
            {["Adultos", "Niños", "Bebés", "Mascotas"].map((label, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="">{label}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(index)}
                    className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
                  >
                    -
                  </button>
                  <span className=" px-4">{counters[index]}</span>
                  <button
                    onClick={() => handleIncrement(index)}
                    className="w-6 bg-[#88A198] border border-gray-300 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleReset}
              className="w-32 text-sm border mr-4 border-[#022933] rounded-2xl"
            >
              Restablecer
            </button>
            <button
              onClick={handleAccept}
              className="w-32 text-sm bg-[#88A198] text-white rounded-2xl"
            >
              Aceptar
            </button>
          </div>
        </div>
      );
    }
  };

  const cardStyles = [
    {
      bgColor: "bg-[#F4EFDF]",
      position: "translate-y-8 translate-x-0",
      zIndex: "z-30",
      
    },
    {
      bgColor: "bg-[#ADA89A]",
      position: "-translate-y-4 translate-x-4",
      zIndex: "z-20",
    },
    {
      bgColor: "bg-[#88A198]",
      position: "-translate-y-16 translate-x-8",
      zIndex: "z-10",
    },
  ];

  return (
    <li className="relative flex flex-col items-center justify-between p-4 border-b-[1px] border-[#022933] h-auto cuantos">
      <div className="flex items-center justify-between w-full h-[5vh] sm:h-full">
        <img className="w-8" src="/imagenes-tarjetas/iconoC2.svg" alt="Icono Cuantos" />
        <span className="text-base">¿Quiénes vendrán?</span>
        <button onClick={toggleCuantos}>
          {showCuantos ? "Cerrar" : <img className="w-4" src="/imagenes-tarjetas/iconoAbrirTarjetaReserva.svg" alt="Abrir Cuantos" />}
        </button>
      </div>

      <div className={`w-full mt-4 transition-height duration-500 ease-in-out ${showCuantos ? 'h-[450px]' : 'h-0'} overflow-hidden`}>
        <div className="relative flex flex-col justify-center items-center w-full h-full">
          {cardStyles.map((style, index) => (
            <div
              key={index}
              className={`absolute w-[65%] h-[270px] rounded-3xl shadow-[10px_-8px_10px_-5px_rgba(0,0,0,0.3)]  cursor-pointer border border-[#022933] border-opacity-10 transition-transform duration-500 ${style.bgColor} ${style.position} ${style.zIndex}`}
            >
              <div className="p-4">
                {getCardContent(contents[index], index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Cuantos;
