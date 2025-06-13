"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import ActionPanel from "@/app/components/ActionPanel/ActionPanel";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import LoopingCutScene from "../LoopingCutScene";
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
export default function ClickGroup({ nodeId }) {
  const { mergedData: scenes, isLoading } = useSceneMetaData();
  console.log("this is mergeData", scenes);
  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressFinal = 75;
  const handleVideoEnd = () => {
    if (currentStep === "first") {
      setCurrentStep("second");
      setShowAction(true);
      setProgress({progressFinal});
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
    }
  };

  const handleAction = (actionType) => {
    setLoopSecondVideo(false);
    sessionStorage.setItem("userInteracted", "true");
    if (actionType === "myself") {
      goToGroup(4);
    } else if (actionType === "friend") {
      goToGroup(2);
    } else {
      nextGroup();
    }
  };
 
  const renderVideo = () => {
    if (isLoading) {
      return <main className="p-4 bg-black text-center flex justify-center items-center h-screen text-neutral-900">Loading game assets...</main>;
    }

    const cutsceneUrl = currentScene?.src?.cutscene?.["1"]?.videoUrl;
    const checkpointUrl = currentScene?.src?.checkpoint?.["1"]?.videoUrl;
    if (currentStep === "first") {
      return <LocalVideoPlayer key="first-video" videoSrc={cutsceneUrl} onProgress={setProgress} onEnded={handleVideoEnd} progressFinal={progressFinal} />;
    }

    if (loopSecondVideo) {
      return <LoopingCutScene key="looping-second-video" videoSrc={checkpointUrl} />;
    }

    return <LoopingCutScene key="looping-second-video" videoSrc={checkpointUrl} />;
  };

  
  return (
    <BasicLayout className="bg-white">
      <TopBar className="bg-transparent h-[90px]">
        <div className="flex  w-full flex-row gap-6 items-center">
          <CancelVidBtn></CancelVidBtn>
          <ProgressBar progress={progress} />
        </div>
      </TopBar>
      {renderVideo()}
      {showAction && <ActionPanel onAction={handleAction} />}
    </BasicLayout>
  );
}

