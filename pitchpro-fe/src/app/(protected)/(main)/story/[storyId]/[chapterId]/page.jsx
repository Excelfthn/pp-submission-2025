"use client";
import React from "react";
import XpChip from "@/app/components/XpChip";
import { useRouter, useParams } from "next/navigation";
import SceneGraph from "@/app/components/SceneGraph";
import PopupInfo from "@/app/components/PopupInfo";
import BackButton from "@/app/components/Buttons/BackButton";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import { SelectedNodeProvider } from "@/app/context/SelectedNodeContext";
export default function ChapterDetail() {
  const router = useRouter();
  const params = useParams();
  const storyId = params?.storyId;
  return (
    <PageTransitionWrapper>
      <SelectedNodeProvider>
        <div className="bg-neutral-50 overflow-y-hidden w-full min-h-screen flex flex-col relative ">
          <div className="bg-neutral-50 h-[94px] flex items-end justify-between py-2 fixed w-full z-40 px-6">
            <BackButton text="Choose Story" onClick={() => router.replace("/story/1")}></BackButton>
            <XpChip></XpChip>
          </div>
          <PopupInfo titleProp="Chapter 1" descriptionProp="Arga, who is collage student, want to  prepare his AI class presentation. "></PopupInfo>
          {/* story journey section */}
          <div className="w-full mt-[206px]  flex-grow relative overflow-x-auto">
            <div className="flex absolute top-0 bottom-0 items-center flex-grow overflow-y-hidden w-max px-8 gap-10 ">
              <SceneGraph />
            </div>
          </div>
        </div>
      </SelectedNodeProvider>
    </PageTransitionWrapper>
  );
}
