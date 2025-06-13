import Image from "next/image";
import {Card} from "@/app/components/Card";
const BADGES = [
  {
    id: 1,
    src: "/assets/illustrations/i_persuasion.svg",
    alt: "Persuation Badge",
    title: "Persuation Pro",
    earned: false,
  },
  {
    id: 2,
    src: "/assets/illustrations/i_prof.svg",
    alt: "Professor's Favorite Badge",
    title: "Professor's Favorite",
    earned: false,
  },
  {
    id: 3,
    src: "/assets/illustrations/i_bold.svg",
    alt: "From Blank to Bold Badge",
    title: "From Blank to Bold",
    earned: false,
  },
  {
    id: 4,
    src: "/assets/illustrations/i_study.svg",
    alt: "Study Magnet Badge",
    title: "Study Magnet",
    earned: false,
  },
  {
    id: 5,
    src: "/assets/illustrations/i_brainstormer.svg",
    alt: "Brainstormer Badge",
    title: "Brainstormer",
    earned: false,
  },
  {
    id: 6,
    src: "/assets/illustrations/i_quiz.svg",
    alt: "Storycrafter Badge",
    title: "Storycrafter",
    earned: false,
  },
  {
    id: 7,
    src: "/assets/illustrations/i_social.svg",
    alt: "Social Strategist Badge",
    title: "Social Strategist",
  },
  {
    id: 8,
    src: "/assets/illustrations/i_quiz.svg",
    alt: "Quiz Whisperer Badge",
    title: "Quiz Whisperer",
    earned: false,
  },
  {
    id: 9,
    src: "/assets/illustrations/i_brainstormer.svg",
    alt: "Mic Dropper Badge",
    title: "Mic Dropper",
    earned: false,
  },
];
export default function Badges({ earnedBadgeIds = [] }) {
  const earnedIds = earnedBadgeIds.map((badge) => badge.badge_id);
  console.log("earnedIds", earnedIds);

  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    earned: earnedIds.includes(badge.id),
  }));
  return (
    <Card padding="p-4" title="Badges">
      <div className="w-full grid grid-cols-3 justify-items-center items-center mx-auto gap-2">
        {badgesWithStatus.map((badge, index) => (
          <BadgeItem key={index} {...badge} />
        ))}
      </div>
    </Card>
  );
}

function BadgeItem({ src, alt, title, earned }) {
  return (
    <div className="flex flex-col">
      <Image height={88} width={88} src={src} alt={alt} className={`object-contain ${earned ? "" : "grayscale opacity-80"}`} />
      <p className="text-center text-neutral-900 text-caption-c1 font-semibold">{title}</p>
    </div>
  );
}