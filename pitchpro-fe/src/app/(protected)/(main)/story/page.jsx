"use client";
import { useRouter } from "next/navigation";
import XpChip from "@/app/components/XpChip";
import StoryCard from "@/app/components/StoryCard";
import PageTransitionWrapper from "@/app/animation/PageTransition";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <PageTransitionWrapper transitionType="dissolve">
        <div className="bg-neutral-50 overflow-y-auto w-full min-h-screen flex flex-col relative ">
          <div className="bg-neutral-50 h-[94px] flex items-end justify-between py-2 fixed w-full z-40 px-6">
            <div className=""></div>
                      <XpChip></XpChip>
                    </div>
          <div className="flex-1 bg-neutral-50 mt-[104px] overflow-y-auto px-6 pb-[104px] flex flex-col gap-8 ">
            <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
              <p className="text-heading-h1 font-semibold">Story</p>
            </div>
            <div className="w-full flex flex-col gap-8">
              <StoryCard id={1} title="4 Minutes of Courage: When Anxiety Meets Opportunity" bgGradient="bg-[linear-gradient(to_bottom_right,#DAECFF,#7BB1EB)]" contentBg="bg-[#EBF4FF]" shadowColor="#ADD5FF" backgroundImageSrc="/assets/image/story_bg.png" />
            </div>
          </div>
        </div>
      </PageTransitionWrapper>
    </>
  );
}
