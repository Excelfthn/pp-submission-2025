"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import OfflineVideoPlayer from "@/components/Video/OfflineVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";
import { useVideoGroup } from "@/app/context/VideoGroupContext";

export default function CutSceneOne({ nodeId, destinationId}) {
  const { mergedData: scenes, isLoading } = useSceneMetaData();
  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  const { goToGroup } = useVideoGroup();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressFinal = 100;
  const cutsceneUrl = currentScene?.src?.cutscene?.["1"]?.videoUrl;

  const handleVideoEnd = () => {
    if (currentIndex < videoSources.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(destinationId);
      sessionStorage.setItem("userInteracted", "true");
      goToGroup(destinationId);
    }
  };


  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex w-full flex-row gap-6 items-center">
          <CancelVidBtn />
          <ProgressBar progress={progress} />
        </div>
      </TopBar>

      <OfflineVideoPlayer 
        key={cutsceneUrl} 
        videoSrc={cutsceneUrl} 
        videoId={`cutscene-${nodeId}-1`}
        onEnded={handleVideoEnd} 
        onProgress={setProgress} 
        progressFinal={progressFinal}
        showDownloadButton={true}
      />
    </BasicLayout>
  );
}
