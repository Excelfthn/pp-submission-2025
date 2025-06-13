"use client";
import { createContext, useContext, useState } from "react";

const VideoGroupContext = createContext();

export const VideoGroupProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(1);

  const nextGroup = () => setCurrentGroup((prev) => prev + 1);
  const goToGroup = (groupNumber) => setCurrentGroup(groupNumber);

  return <VideoGroupContext.Provider value={{ currentGroup,setCurrentGroup, nextGroup, goToGroup }}>{children}</VideoGroupContext.Provider>;
};

export const useVideoGroup = () => useContext(VideoGroupContext);
