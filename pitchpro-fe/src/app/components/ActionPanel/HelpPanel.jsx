"use client";

import Button from "../Button";
import SlideUpAnimation from "@/app/animation/SlideUpAnimation";

export default function HelpPanel({ onClose }) {
  return (
    <>
      <SlideUpAnimation className="flex bottom-0 fixed rounded-t-[20px] bg-[#EBF4FF] flex-col justify-between items-center w-full px-5 pt-6 h-auto pb-12">
        {/* title */}
        <p className="text-title pb-5 text-center text-neutral-800 font-semibold">Help</p>
        <div className="buttons flex flex-col w-full gap-6 justify-center">
          <Button variant="info" className="font-[500]">
            Change Subtitle
          </Button>
          <Button variant="info" className="font-[500]">
            Can't speak now
          </Button>
          <Button onClick={onClose}>Back</Button> {/* Call onClose to hide */}
        </div>
      </SlideUpAnimation>
    </>
  );
}