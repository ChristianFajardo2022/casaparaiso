import React, { useState } from "react";
import imagencerrar from "/imagenes-tarjetas/iconoCerrarAzul.svg";
import izq from "/imagenes-tarjetas/iz.svg";
import der from "/imagenes-tarjetas/der.svg";
import cer from "/imagenes-tarjetas/cerrargaleria.svg";
import data from "../assets/data"; // Importar los datos

const Tarjeta = ({ title, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeDot, setActiveDot] = useState(0); // Estado para el dot activo
  const [tarjetaData, setTarjetaData] = useState(data.find(item => item.title === title));

  // Asegúrate de que el primer setSelectedImage se actualice correctamente
  useState(() => {
    if (tarjetaData) {
      setSelectedImage(tarjetaData.images[0]);
      setCurrentIndex(0);
    }
  }, [tarjetaData]);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handlePrevImage = () => {
    if (tarjetaData && tarjetaData.images.length > 0) {
      const newIndex = (currentIndex - 1 + tarjetaData.images.length) % tarjetaData.images.length;
      setSelectedImage(tarjetaData.images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (tarjetaData && tarjetaData.images.length > 0) {
      const newIndex = (currentIndex + 1) % tarjetaData.images.length;
      setSelectedImage(tarjetaData.images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleDotClick = (index) => {
    setActiveDot(index);
    const newTarjetaData = data.find(item => item.title === names[index]);
    setTarjetaData(newTarjetaData);
    setSelectedImage(newTarjetaData.images[0]);
    setCurrentIndex(0);
  };

  const names = data.map(item => item.title);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[55] flex items-center justify-center backdrop-blur-xl bg-gray-900 bg-opacity-35">
      <div className="flex flex-col items-center max-w-[90%] md:max-w-[70%] bg-[--bg] relative p-4 rounded-2xl md:flex-row md:p-0">
        <button onClick={onClose} className="absolute top-[-45px] md:top-4 right-4 md:right-4">
          <img src={imagencerrar} className="w-6 md:w-6" />
        </button>
        <div className="w-full md:w-2/3 relative">
          <div className="relative flex items-center justify-center">
            <img
              src={selectedImage || ''}
              className="w-full z-[70] cursor-pointer rounded-l-2xl object-cover h-[300px] md:h-[500px]"
              alt={tarjetaData?.title || ''}
              onClick={handleImageClick}
            />
            <div className="absolute z-[70] bottom-4 left-8 flex">
              <img className="w-6 mr-4" src="/imagenes-tarjetas/iconoPrincipal.svg"/>
              <div>
                <h1 className="font-bold text-xl md:text-2xl">{tarjetaData?.title || ''}</h1>
                <p className="text-xs">primer piso</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-[#022933] items-start w-full md:w-1/3 mt-4 md:mt-0 md:mx-8 p-8">
          <div className="flex justify-between w-full mb-4 space-x-4">
            {tarjetaData?.images.slice(0, 3).map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                className="w-[80px] h-[80px] md:w-[80px] md:h-[80px] object-cover rounded-3xl cursor-pointer"
                alt={`Thumbnail ${index + 1}`}
                onClick={() => {
                  setSelectedImage(imgSrc);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
          <h1 className="text-3xl mb-8">Descripción:</h1>
          <p
            dangerouslySetInnerHTML={{ __html: tarjetaData?.description || '' }}
            className="text-start text-xs mt-2 w-full creatoRegular"
          />
          <div className="flex justify-between w-full mt-8 text-xs">
            <div className="h-12 flex flex-col items-center justify-center">
              <img className="w-4 pb-2" src="/imagenes-tarjetas/iconoArea.svg" />
              <p>Área</p>
              <p>10 m2</p>
            </div>
            <div className="h-12 flex flex-col items-center justify-center">
              <img className="w-8 pb-2" src="/imagenes-tarjetas/iconoTemp.svg" />
              <p>Temp.</p>
              <p>Regulable</p>
            </div>
            <div className="h-12 flex flex-col items-center justify-center">
              <img className="w-4 pb-2" src="/imagenes-tarjetas/iconoBanos.svg" />
              <p>Baños</p>
              <p>Privados</p>
            </div>
          </div>
          {/* Dots */}
        </div>
      </div>

      {isFullScreen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[80] backdrop-blur-sm">
          <div className="relative w-4/5 h-4/5 rounded-lg flex items-center justify-center">
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            >
              <img src={izq} className="w-16" />
            </button>
            <img src={selectedImage} className="max-w-4/5 max-h-4/5 rounded-lg" alt="Selected" />
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            >
              <img src={der} className="w-16" />
            </button>
          </div>
          <button
            onClick={handleCloseFullScreen}
            className="absolute top-4 right-4"
          >
            <img src={cer} className="w-8" />
          </button>
        </div>
      )}
<div className="absolute bottom-[10vh] flex justify-center mt-4">
  {names.map((name, index) => (
    <button
      key={index}
      className={` mx-3 rounded-full ${activeDot === index ? 'w-[100px] h-[10px] bg-[#F4EFDF]' : 'w-[10px] h-[10px] bg-[#F4EFDF]'}`}
      onClick={() => handleDotClick(index)}
    />
  ))}
</div>

    </div>
  );
};

export default Tarjeta;
