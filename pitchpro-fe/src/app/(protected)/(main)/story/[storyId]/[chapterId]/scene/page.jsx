"use client";
import { useVideoGroup, VideoGroupProvider } from "@/app/context/VideoGroupContext";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ClickGroup from "@/app/components/VideoGroup/ClickGroup";
import CutSceneTwo from "@/app/components/VideoGroup/cutSceneTwo";
import CutSceneThree from "@/app/components/VideoGroup/cutSceneThree";
import CutSceneFour from "@/app/components/VideoGroup/cutSceneFour";
import CutSceneFive from "@/app/components/VideoGroup/cutSceneFive";
import CutSceneSix from "@/app/components/VideoGroup/cutSceneSix";
import CutSceneSeven from "@/app/components/VideoGroup/cutSceneSeven";
import SinlgeAudioInputGroup from "@/app/components/VideoGroup/SingleAudioInputGroup";
import VideoMaterial from "@/app/components/VideoGroup/VIdeoMaterial";
import AudioInputGroup from "@/app/components/VideoGroup/SingleAudioInputGroup";
import CutSceneOne from "@/app/components/VideoGroup/CutSceneOne";
import MultipleAudioInputGroup from "@/app/components/VideoGroup/MultipleAudioInputGroup";

function GamePageContent() {
  const searchParams = useSearchParams();
  const nodeId = parseInt(searchParams.get("id")); 
  const { currentGroup, setCurrentGroup } = useVideoGroup();
  useEffect(() => {
    if (nodeId) {
      setCurrentGroup(nodeId);
    }
  }, [nodeId]);
  const renderGroup = () => {
    switch (currentGroup) {
      case 1:
        return <ClickGroup nodeId={1} />;
      case 2:
        return <SinlgeAudioInputGroup nodeId={2} />;
      case 3:
        return <CutSceneOne nodeId={3} destinationId={4} />;
      case 4:
        return <CutSceneTwo nodeId={4} destinationId={5} />;
      case 5:
        return <CutSceneThree nodeId={5} destinationId={11} />;
      case 6:
        return <CutSceneFour nodeId={6} destinationId={7} />;
      case 7:
        return <CutSceneFive nodeId={7} destinationId={8} />;
      case 8:
        return <VideoMaterial nodeId={8} destinationId={9} />;
      case 9:
        return <MultipleAudioInputGroup nodeId={9} />;
      case 10:
        return <CutSceneSix nodeId={10} destinationId={11} />;
      case 11:
        return <AudioInputGroup />;
      case 12:
        return <CutSceneSeven />;

      default:
        return <div>Game Complete</div>;
    }
  };


  return <main className="bg-white">{renderGroup()}</main>;
}

export default function GamePage() {
  return (
    <VideoGroupProvider>
      <GamePageContent />
    </VideoGroupProvider>
  );
}
