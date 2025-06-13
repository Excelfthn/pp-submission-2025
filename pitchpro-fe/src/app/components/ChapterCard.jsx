"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function ChapterCard({ title, description, chapterId }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}/${chapterId}`);
  };

  return (
    <div className="w-full py-4 px-3 flex bg-[#EBF4FF] flex-row rounded-2xl gap-[6px]  shadow-[0px_4px_0px_0px_#ADD5FF] cursor-pointer" onClick={handleClick}>
      <Image width={78} height={78} src="/assets/illustrations/i_chapter.svg" alt="Chapter Illustration" />
      <p className="flex flex-col items-start gap-1 text-body text-neutral-950 font-semibold">
        {title}
        <span className="text-label font-normal">{description}</span>
      </p>
    </div>
  );
}