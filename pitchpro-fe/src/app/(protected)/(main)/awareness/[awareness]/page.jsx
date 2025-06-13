"use client";
import { useState } from "react";
import BasicLayout from "@/app/components/BasicLayout";
import TopBar from "@/app/components/bar/TopBar";
import BackButton from "@/app/components/Buttons/BackButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageTransitionWrapper from "@/app/animation/PageTransition";

const contentData = {
  description: `Public speaking anxiety refers to the intense fear or anxiety of speaking in front of others. It's a type of social fear that can impact daily life, especially in professional and social environments. While it's normal to feel
nervous before speaking, public speaking anxiety involves an excessive and overwhelming fear that causes individuals to avoid such situations.

**Symptoms of Public Speaking Anxiety**:
- Excessive anxiety and fear: Individuals experience intense worry and panic about speaking in public, often feeling overwhelmed.
- Avoidance: They may avoid any situation that involves public speaking, even if it harms their career or social relationships.
- Physical symptoms: Symptoms like rapid heartbeat, sweating, trembling, or shortness of breath may occur during speaking situations.
- Cognitive symptoms: They often have negative thoughts, harsh self-criticism, and doubts about their ability to speak effectively.
`,
  tips: [
    "Cognitive behavioral therapy (CBT): Helps reprogram negative thinking patterns and build healthier reactions to speaking situations.",
    "Medication: Beta-blockers or anti-anxiety meds can help control physical symptoms like rapid heartbeat and trembling.",
    "Exposure practice: Gradually practicing speaking in low-pressure settings builds comfort and resilience over time.",
    "Consistent preparation: Thorough preparation and rehearsing speeches can strengthen confidence and reduce fear.",
    "Peer support: Sharing experiences with others facing the same challenge can provide encouragement and new coping tips.",
    "Controlled breathing: Slow, deep breathing before and during speaking can relax the body and steady the mind.",
    "Mental rehearsal: Visualizing a calm, successful performance helps condition the brain for real situations.",
    "Empowering self-talk: Using positive affirmations can counter fear and boost a speaker’s belief in their ability.",
  ],
};

export default function AwarenessDetail() {
const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");

  const toggleContent = () => (
    <AnimatePresence mode="wait">
      {activeTab === "description" ? (
        <motion.p key="description" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="text-body text-normal text-neutral-900 whitespace-pre-wrap">
          {contentData.description}
        </motion.p>
      ) : (
        <motion.ul key="tips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="list-disc ml-5 text-body text-normal text-neutral-900">
          {contentData.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
<PageTransitionWrapper>
    <BasicLayout className="flex flex-col w-full bg-neutral-50">
      <TopBar bgColor="bg-[#80CAEA]">
        <BackButton onClick={() => router.replace("/awareness")} text="Back" />
      </TopBar>
      <div className="flex flex-col mt-[94px] pb- px-5 overflow-auto py-6 w-full items-center">
        <p className="text-heading w-full font-[600] mb-6 text-neutral-900 text-start">Public Speaking Anxiety</p>
        <Image src="/assets/illustrations/ic_awareness.svg" height={240} width={240} alt="Welcome Illustration" />
        <div className="flex w-full justify-center my-6 bg-[#D9D9D9] rounded-[12px] py-[6px] px-[7px] flex-row">
          <button className={`text-label py-[6px] font-[550] w-1/2 rounded-[8px] text-neutral-900 ${activeTab === "description" ? "bg-white" : "bg-transparent"}`} onClick={() => setActiveTab("description")}>
            Description
          </button>
          <button className={`w-1/2 py-[6px] leading-[20px] text-label font-[550] text-neutral-900 rounded-[8px] ${activeTab === "tips" ? "bg-white" : "bg-transparent"}`} onClick={() => setActiveTab("tips")}>
            Tips and Trick
          </button>
        </div>
        <div className="mt-4 w-full">{toggleContent()}</div>
      </div>
    </BasicLayout>
    </PageTransitionWrapper>
  );
}
