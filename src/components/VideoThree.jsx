// src/App.js
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, useAspect, useVideoTexture } from "@react-three/drei";
import videoCasa from "../assets/playa.mp4";

function VideoMesh({ videoUrl, onVideoTimeUpdate }) {
  const texture = useVideoTexture(videoUrl, {
    crossOrigin: "Anonymous",
    autoplay: true,
    loop: true,
  });
  const size = useAspect(window.innerWidth, window.innerHeight, 1);

  // Add event listener to the video to track time update
  useEffect(() => {
    if (texture) {
      const video = texture.image;
      const handleTimeUpdate = () => {
        if (video.currentTime >= 5) {
          onVideoTimeUpdate();
        }
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [texture, onVideoTimeUpdate]);

  return (
    <mesh scale={size}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function caApp() {
  const [videoUrl, setVideoUrl] = useState(videoCasa);
  const [showButtons, setShowButtons] = useState(false);

  const handleChangeVideo = (url) => {
    setVideoUrl(url);
    setShowButtons(false); // Reset button visibility when video changes
  };

  const handleVideoTimeUpdate = () => {
    setShowButtons(true);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas style={{ position: "absolute", top: 0, left: 0 }}>
        <OrbitControls enableZoom={false} />
        <VideoMesh
          videoUrl={videoUrl}
          onVideoTimeUpdate={handleVideoTimeUpdate}
        />
      </Canvas>
      {showButtons && (
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <button onClick={() => handleChangeVideo(videoCasa)}>Video 1</button>
          <button onClick={() => handleChangeVideo(videoCasa)}>Video 2</button>
        </div>
      )}
    </div>
  );
}

export default caApp;
