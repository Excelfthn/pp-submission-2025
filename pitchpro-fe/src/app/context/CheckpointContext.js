import React, { createContext, useRef, useContext } from "react";

const CheckpointContext = createContext();

export const CheckpointProvider = ({ children,story }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current?.play().catch(() => {});
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  return <CheckpointContext.Provider value={{ audioRef, playAudio, pauseAudio,story }}>{children}</CheckpointContext.Provider>;
};

export const useCheckpoint = () => useContext(CheckpointContext);
