"use client";
import Button from "../Button";
import Line from "../Line";
import { useState } from "react";
import SlideUpAnimation from "@/app/animation/SlideUpAnimation";

export default function ActionPanel({ onAction }) {
  const [selectedOption, setSelectedOption] = useState(null); 

  const handleNext = () => {
    if (selectedOption && onAction) {
      onAction(selectedOption);
    }
  };

  return (
    <SlideUpAnimation className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
      <p className="text-title pb-5 text-neutral-800 font-semibold">What do you want?</p>

      <div className="buttons flex flex-col w-full gap-6 justify-center">
        <Button variant="info" className={`font-[500] ${selectedOption === "friend" ? "ring-2 ring-blue-500" : ""}`} onClick={() => setSelectedOption("friend")}>
          Practice With Friend
        </Button>

        <Button variant="info" className={`font-[500] ${selectedOption === "myself" ? "ring-2 ring-blue-500" : ""}`} onClick={() => setSelectedOption("myself")}>
          Practice With Myself
        </Button>

        <Line />

        <Button
          onClick={handleNext}
          disabled={!selectedOption}
        >
          Next
        </Button>
      </div>
    </SlideUpAnimation>
  );
}
