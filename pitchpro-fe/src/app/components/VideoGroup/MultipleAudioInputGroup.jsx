"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import LoopingVideoPlayer from "../LoopingVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
import RecordActionPanel from "../ActionPanel/RecordActionPanel";
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";
import Pretest from "../pre-test/page";
import PracticeFeedback from "../feedback/PracticeFeedback";
import PostTest from "../PostTest/page";
import { useEffect } from "react";
import { CheckpointProvider } from "@/app/context/CheckpointContext";

export default function MultipleAudioInputGroup({ nodeId }) {
  const scenes = useSceneMetaData();
  const [pretestDone, setPretestDone] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openPosttest, setOpenPosttest] = useState(false);
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [step, setStep] = useState("pretest");
  const progressFinal = 75;

  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  const firstId = currentScene?.story_id;
  const hasDonePretest = currentScene?.is_pre_test;
  const hasDonePosttest = currentScene?.is_post_test;

  const handleVideoEnd = () => {
    if (step === "cutscene") {
      setStep("checkpoint");
    }
  };

  const handleAudioResult = (result) => {
    if (result !== undefined) {
      setStep("feedback");
    }
  };
  useEffect(() => {
    if (step === "checkpoint") {
      setShowAction(true);
    } else {
      setShowAction(false);
    }
  }, [step]);
  

  const handleFeedbackDone = () => {
    if (currentIndex < 5) {
      setCurrentIndex(currentIndex + 1);
      setStep("cutscene");
    } else {
      setStep("posttest");
    }
  };

  const renderVideo = () => {
    const cutsceneVideo = currentScene?.src?.cutscene?.[currentIndex];
    const checkpointVideo = currentScene?.src?.checkpoint?.[currentIndex];

    if (step === "cutscene" && cutsceneVideo) {
      return <LocalVideoPlayer key={`cutscene-${currentIndex}`} videoSrc={cutsceneVideo} onProgress={setProgress} onEnded={handleVideoEnd} progressFinal={progressFinal} />;
    }

    if (step === "checkpoint" && checkpointVideo) {
      return <LoopingVideoPlayer key={`checkpoint-${currentIndex}`} videoSrc={checkpointVideo} />;
    }

    return null;
  };
  

  if (step === "pretest") {
    return <Pretest nodeId={firstId} status={hasDonePretest} currentScene={currentScene} onDone={() => setStep("cutscene")} />;
  }

  if (step === "posttest") {
    return <PostTest onDone={() => goToGroup(6)} nodeId={nodeId} status={hasDonePosttest} />;
  }

  if (step === "feedback") {
    const currentStory = currentScene?.story?.[currentIndex];
    return <PracticeFeedback id={currentStory?.story_id} onDone={handleFeedbackDone} />;
  }
  

  return (
    <CheckpointProvider story={currentScene?.story}>
      <BasicLayout className="bg-white">
        <TopBar className="bg-transparent h-[90px]">
          <div className="flex w-full flex-row gap-6 items-center">
            <CancelVidBtn />
            <ProgressBar progress={progress} />
          </div>
        </TopBar>
        {renderVideo()}
        {step === "checkpoint" && showAction && <RecordActionPanel nodeId={currentScene?.story?.[currentIndex]?.story_id} onResultReceived={handleAudioResult} />}
      </BasicLayout>
    </CheckpointProvider>
  );
}
