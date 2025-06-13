"use client";
import React, { useState, useRef,useEffect } from "react";
import AudioRecorder from "../Recorder";
import Countdown from "../Countdown";
import Line from "../Line";
import Button from "../Button";
import IconInfo from "../../../../public/assets/icons/IconInfo";
import SlideUpAnimation from "@/app/animation/SlideUpAnimation";
import HelpPanel from "./HelpPanel";
import { useDispatch } from "react-redux";
import { uploadAudio } from "@/redux/features/Audio/audioSlice";
import { useCheckpoint } from "@/app/context/CheckpointContext";
export default function RecordActionPanel({ nodeId, generateResult }) {
  const { pauseAudio,story } = useCheckpoint();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isHelpPanelOpen, setIsHelpPanelOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const firstStory = Object.values(story)?.[0];
  const isGenerated = firstStory?.is_generated ?? false;
  const audioRecorderRef = useRef(null);

  const toggleHelpPanel = () => {
    setIsHelpPanelOpen(!isHelpPanelOpen);
  };

  const handleRecordingStart = () => {
    pauseAudio();
    setIsRecording(true);
    setCountdownRunning(true);
    setRecordedAudio(null);
  };

  const handleRecordingStop = (audioBlob) => {
    setIsRecording(false);
    setCountdownRunning(false);
    if (audioBlob) {
      setRecordedAudio(audioBlob);
      console.log("Audio received in parent:", audioBlob);
    }
  };

  const handleCountdownComplete = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stopRecording();
    }
    setCountdownRunning(false);
  };

  const handleClick = async () => {
    console.log("AudioBlob info:", recordedAudio);
    console.log("Size:", recordedAudio?.size);
    console.log("Type:", recordedAudio?.type);

    setLoading(true);
    try {
      console.log("Uploading audio with nodeId:", nodeId, recordedAudio);
      const resultAction = await dispatch(uploadAudio({ id: nodeId, audioBlob: recordedAudio,status:isGenerated }));

      if (uploadAudio.fulfilled.match(resultAction)) {
        const response = resultAction.payload;
        console.log("Upload success:", response);
        generateResult(response.data);


        if (response.data !== undefined) {
          console.log("Response data:", response?.data);
        }
        
      } else {
        console.error("Upload failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>
      <SlideUpAnimation className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
        {/* title */}
        <p className="text-title pb-5 text-neutral-800 font-semibold">Persuade Dimas</p>
        <div className="buttons flex flex-col w-full gap-6 justify-center">
          <div className="flex gap-6 flex-row items-center justify-between">
            {/* info button */}
            <Button width="w-fit" className="px-7 py-4" variant="info" onClick={toggleHelpPanel}>
              <IconInfo />
            </Button>
            <AudioRecorder ref={audioRecorderRef} onRecordingStart={handleRecordingStart} onRecordingStop={handleRecordingStop} isRecording={isRecording} />
          </div>
          <Countdown number={30} running={countdownRunning} onComplete={handleCountdownComplete} />
          <Line />
          <Button disabled={!recordedAudio || loading} onClick={handleClick}>
            {loading ? "Loading..." : "Next"}
          </Button>
        </div>
      </SlideUpAnimation>
      {isHelpPanelOpen && <HelpPanel onClose={toggleHelpPanel} />}
    </>
  );
}
