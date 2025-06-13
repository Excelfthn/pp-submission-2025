"use client";
import { useRef, useEffect, useState } from "react";
import { useCheckpoint } from "../context/CheckpointContext";

export default function LoopingVideoPlayer({ videoSrc }) {
  const { audioRef } = useCheckpoint();
  const videoRef = useRef(null);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    const handleError = () => {
      console.warn("Video failed to load:", currentVideoSrc);
      // Try fallback to local video if current source fails
      if (!hasError && !currentVideoSrc.startsWith("/videos/")) {
        const fileName = currentVideoSrc.split("/").pop() || currentVideoSrc;
        const localFallback = `/videos/${fileName}`;
        console.log("Attempting fallback to local video:", localFallback);
        setCurrentVideoSrc(localFallback);
        setHasError(true);
      }
    };

    if (video) {
      video.addEventListener("error", handleError);
      video.play().catch(() => {});
    }

    if (audio) {
      audio.play().catch(() => {});
    }

    return () => {
      if (video) {
        video.removeEventListener("error", handleError);
      }
    };
  }, [currentVideoSrc, hasError]);

  // Update currentVideoSrc when videoSrc prop changes
  useEffect(() => {
    setCurrentVideoSrc(videoSrc);
    setHasError(false);
  }, [videoSrc]);

  return (
    <div className="w-full h-screen bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        key={currentVideoSrc}
      >
        <source src={currentVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} autoPlay loop preload="auto" className="hidden">
        <source src="/assets/audio/music.mp3" type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}
