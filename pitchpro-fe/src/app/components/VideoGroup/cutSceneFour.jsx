"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import { useMemo } from "react";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";

export default function CutSceneFour({ nodeId, destinationId }) {
  const { goToGroup } = useVideoGroup();
  const { mergedData: scenes, isLoading } = useSceneMetaData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressFinal = 100;

  // Get video sources based on nodeId
  const videoSources = useMemo(() => {
    const scene = scenes.find((item) => item.id === nodeId);
    if (!scene || !scene.src?.cutscene) return [];
    // Get and return the cutscene videos as an array sorted by key
    return Object.keys(scene.src.cutscene)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => scene.src.cutscene[key].videoUrl);
  }, [scenes, nodeId]);

  const handleVideoEnd = () => {
    if (currentIndex < videoSources.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(destinationId);
      sessionStorage.setItem("userInteracted", "true");
      goToGroup(destinationId);
    }
  };

  if (isLoading) {
    return <main className="p-4 bg-black text-center flex justify-center items-center h-screen text-neutral-900">Loading game assets...</main>;
  }

  if (videoSources.length === 0) {
    return <p>No cutscene available for nodeId: {nodeId}</p>;
  }

  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex w-full flex-row gap-6 items-center">
          <CancelVidBtn />
          <ProgressBar progress={progress} />
        </div>
      </TopBar>

      <LocalVideoPlayer key={`video-${currentIndex}`} videoSrc={videoSources[currentIndex]} onEnded={handleVideoEnd} onProgress={setProgress} progressFinal={progressFinal} />
    </BasicLayout>
  );
}
