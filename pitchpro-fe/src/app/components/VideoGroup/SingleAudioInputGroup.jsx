"use client";
import { useState,useEffect } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
import LoopingVideoPlayer from "../LoopingVideoPlayer";
import TopBar from "../bar/TopBar";
import CancelVidBtn from "../Buttons/CancelVidBtn";
import ProgressBar from "../ProgressBar";
import { useVideoGroup } from "@/app/context/VideoGroupContext";
import RecordActionPanel from "../ActionPanel/RecordActionPanel";
import Pretest from "../pre-test/page";
import PracticeFeedback from "../feedback/PracticeFeedback";
import PostTest from "../PostTest/page";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import { CheckpointProvider } from "@/app/context/CheckpointContext";
import { useSceneMetaData } from "@/app/hooks/useSceneMetaData";
export default function SingleAudioInputGroup
({nodeId,}) {
  const { mergedData: scenes, isLoading } = useSceneMetaData();
  const currentScene = scenes.find((scene) => scene.id === Number(nodeId));
  // const scenes = useSceneMetaData();
  const [pretestDone, setPretestDone] = useState(false);
  const [AudioInputDone, setAudioInputDone] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openPosttest, setOpenPosttest] = useState(false);
  const [currentStep, setCurrentStep] = useState("first");
  const { nextGroup, goToGroup } = useVideoGroup();
  const [showAction, setShowAction] = useState(false);
  const [generateResult,setGenerateResult]=useState(null)
  const [loopSecondVideo, setLoopSecondVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressFinal = 75;
  const firstId = currentScene?.story_id;
  const hasDonePretest = currentScene?.is_pre_test;
  const hasDonePosttest = currentScene?.is_post_test;
  const cutsceneUrl = currentScene?.src?.cutscene?.["1"]?.videoUrl;
  const checkpointUrl = currentScene?.src?.checkpoint?.["1"]?.videoUrl;

  console.log("this is scenes",scenes);
  console.log("ini scene saat ini",currentScene);


  const handleVideoEnd = () => {
    if (currentStep === "first") {
      setCurrentStep("second");
      setShowAction(true);
      setProgress({ progressFinal });
    } else if (currentStep === "second" && !showAction) {
      setLoopSecondVideo(true);
    }
  };
  

  const renderVideo = () => {
    if (currentStep === "first") {
      return <LocalVideoPlayer key="first-video" videoSrc={cutsceneUrl} onProgress={setProgress} onEnded={handleVideoEnd} progressFinal={progressFinal} />;
    }

    if (loopSecondVideo) {
      return <LoopingVideoPlayer key="looping-second-video" videoSrc={checkpointUrl} />;
    }

    return <LoopingVideoPlayer key="looping-second-video" videoSrc={checkpointUrl} />;
  };

  // open feedback
  useEffect(() => {
    if (generateResult !== null) {
      setOpenFeedback(true);
    }
  }, [generateResult]);


  if (!pretestDone) {
    return <Pretest nodeId={currentScene?.story_id} status={hasDonePretest}  currentScene={currentScene} onDone={() => setPretestDone(true)} />;
  }

  if (openFeedback) {
    return (
      <PracticeFeedback
        id={firstId}
        onDone={() => {
          setOpenFeedback(false);
          setOpenPosttest(true);
        }}
      />
    );
  }
  

  if (openPosttest) {
    return (
      <PostTest
        onDone={() => {
          if (generateResult) {
            goToGroup(6);
          } else {
            goToGroup(3);
          }
        }}
        nodeId={currentScene?.story_id}
        status={hasDonePosttest}
      />
    );
  }

  return (
    <CheckpointProvider story={currentScene?.story}>
      <BasicLayout className="bg-white">
        <TopBar className="bg-transparent h-[90px]">
          <div className="flex  w-full flex-row gap-6 items-center">
            <CancelVidBtn></CancelVidBtn>
            <ProgressBar progress={progress} />
          </div>
        </TopBar>
        {renderVideo()}
        {showAction && <RecordActionPanel nodeId={firstId} generateResult={setGenerateResult} />}
      </BasicLayout>
    </CheckpointProvider>
  );
}
