"use client";
import { useRef, useEffect } from "react";

export default function LoopingCutScene({ videoSrc }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.play().catch(() => {});
    }

    if (audio) {
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} autoPlay loop preload="auto" className="hidden">
        <source src="/assets/audio/music.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}
