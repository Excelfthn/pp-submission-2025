import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function StoryCard({ title, contentBg, shadowColor, id, backgroundImageSrc }) {
  const router = useRouter();

  return (
    <div className="w-full rounded-[20px] relative h-[384px] cursor-pointer overflow-hidden flex flex-col" onClick={() => router.push(`/story/${id}`)}>
      {backgroundImageSrc && (
        <div className="relative w-full h-[57%]">
          <Image src={backgroundImageSrc} alt={title} layout="fill" objectFit="cover" className="rounded-t-[20px]" />
        </div>
      )}

      <div className={`content w-full h-[43%] ${contentBg} p-5 shadow-[0px_4px_0px_0px_${shadowColor}] rounded-b-[20px] flex items-start`}>
        <p className="text-heading-h3 font-[550] text-start text-[#0A4585]">{title}</p>
      </div>
    </div>
  );
}
