import React, { useRef, useEffect, useState } from "react";
import Menu from "./Menu";
import MenuMovil from "./MenuMovil";
import Tarjeta from "./Tarjeta";
import data from "../assets/data";
import { LogoImagen } from "./loader/LogoImagen";
import Reserva from "../components/Reservas";
import Ubicacion from "../components/Ubicacion";
import AudioPlayer from "./audio/AudioPlayer";
import audioMusic from "../assets/audioMusic.mp3";
import { useMediaQuery } from 'react-responsive';
import "../react-datepicker.css";

const VideoPlayer = ({
  videoSrc,
  setStarted,
  play,
  setPlay,
  isPlaying,
  handleClickAudio,
  audioRef,
}) => {
  const videoRef = useRef(null);
  const [showTarjeta, setShowTarjeta] = useState(false);
  const [showReserva, setShowReserva] = useState(false);
  const [showUbicacion, setShowUbicacion] = useState(false);

  // Detectar si la pantalla es móvil
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  const handleShowTarjeta = (nombre) => {
    const tarjetaData = data.find((item) => item.title === nombre);
    setShowTarjeta(tarjetaData);
    setPlay(false);
  };

  const handleHideTarjeta = () => {
    setShowTarjeta(false);
    setPlay(true);
  };

  const handleShowReserva = () => {
    setShowReserva(true);
    setPlay(false);  // Detener el video al mostrar la reserva
  };

  const handleHideReserva = () => {
    setShowReserva(false);
    setPlay(true);  // Reanudar el video al ocultar la reserva
  };

  const handleShowUbicacion = () => {
    setShowUbicacion(true);
    setPlay(false);  // Detener el video al mostrar la ubicación
  };

  const handleHideUbicacion = () => {
    setShowUbicacion(false);
    setPlay(true);  // Reanudar el video al ocultar la ubicación
  };

  return (
    <div className="absolute z-0 top-0 left-0 w-full h-full overflow-hidden movil">
      <AudioPlayer
        audioRef={audioRef}
        audioSrc={audioMusic}
        isPlaying={isPlaying}
        handleClickAudio={handleClickAudio}
        active={true}
      />

      {/* Renderiza Menu para escritorio y MenuMovil para móviles */}
      {isMobile ? (
        <MenuMovil
          audioRef={audioRef}
          handleShowReserva={handleShowReserva}
          onButtonClick={handleShowTarjeta}
          isPlaying={isPlaying}
          handleClickAudio={handleClickAudio}
        />
      ) : (
        <Menu
          audioRef={audioRef}
          handleShowReserva={handleShowReserva}
          onButtonClick={handleShowTarjeta}
          isPlaying={isPlaying}
          handleClickAudio={handleClickAudio}
        />
      )}

      {showReserva && <Reserva onClose={handleHideReserva} />}
      {showUbicacion && <Ubicacion onClose={handleHideUbicacion} />}

      <LogoImagen />
      <div className="bg-gradient-to-b from-[#00000070] via-transparent to-[#000000a1] fixed z-[1] top-0 left-0 w-screen h-screen pointer-events-none" />
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        onLoadedMetadata={() => setStarted(true)}
      />

      {showTarjeta && (
        <Tarjeta
          videoSrc={showTarjeta.videoSrc}
          images={showTarjeta.images}
          title={showTarjeta.title}
          desTarjeta={showTarjeta.desTarjeta}
          description={showTarjeta.description}
          onClose={handleHideTarjeta}
        />
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 z-[40] space-y-2">
        <button
          className="w-full border-2 px-10 flex justify-center py-1 rounded-2xl bg-[#f4efdf] text-[#022933] hover:text-[#f4efdf] hover:bg-[#f4efdf3d]"
          onClick={handleShowReserva}
        >
          <img className="w-6 mr-2" src="/imagenes-tarjetas/iconoReserva.svg" />
          Reserva
        </button>
      </div>
      <div className="absolute top-8 right-[-2.5rem] sm:right-2 transform -translate-x-1/2 w-28 sm:w-40 z-[40] space-y-2">
      <button
          className="w-full border-[1px] border-[#022933] px-10 flex justify-center items-center py-1 rounded-2xl bg-[#f4efdf3d] text-[#022933] hover:bg-[#f4efdf]"
          onClick={handleShowUbicacion}
        >
          <img className="w-4 mr-2" src="/imagenes-tarjetas/iconoUbicacion.svg" />
          Ubicación
        </button>

      </div>
    </div>
  );
};

export default VideoPlayer;
