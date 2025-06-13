"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import IcCancelCircle from "../../../../public/assets/icons/ic_cancel_circle";
import { CardFilled } from "../Card";
import Button from "../Button";
import { setNavigationDirection } from "@/app/utils/NavigationDirection";
export default function CancelVidBtn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleCancelClick = () => {
    setIsDialogOpen(true);
  };

  const handleQuit = () => {
    setIsDialogOpen(false);
        setNavigationDirection("backward");
    router.back();
  };

  const handleKeepPractice = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button onClick={handleCancelClick}>
        <IcCancelCircle />
      </button>

      {isDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50  flex justify-center items-center z-50 px-5">
          <CardFilled>
            <div className="flex flex-col gap-3 items-start w-full">
              <p className="flex flex-col gap-1 items-start text-body font-[550] text-neutral-900">
                Are You Sure?
                <span className="text-label font-normal">Your progress will not be saved.</span>
              </p>
              <div className="flex flex-row gap-3 w-full">
                <Button onClick={handleQuit} variant="info">
                  Quit
                </Button>
                <Button onClick={handleKeepPractice}>Keep Practice</Button>
              </div>
            </div>
          </CardFilled>
        </div>
      )}
    </>
  );
}
