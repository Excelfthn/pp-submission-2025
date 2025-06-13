"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import IcHome from "../../../public/assets/icons/ic_home";
import IcProfile from "../../../public/assets/icons/ic_profile";
import IcStar from "../../../public/assets/icons/ic_star";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("home");

  useEffect(() => {
    if (pathname.includes("awareness")) setActive("awareness");
    else if (pathname.includes("profile")) setActive("profile");
    else setActive("home");
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full px-4 bg-primary-50 border-t-[1px] border-primary-700 flex flex-row justify-center items-center pt-3 pb-4">
      <button onClick={() => router.push("/")} className={`flex w-28 flex-col gap-2 items-center text-label font-semibold transition-colors duration-300 ${active === "home" ? "text-primary-700" : "text-neutral-900"}`}>
        <IcHome active={active === "home"} />
        Home
      </button>

      <button onClick={() => router.push("/awareness")} className={`flex w-28 flex-col gap-2 items-center text-label font-semibold transition-colors duration-300 ${active === "awareness" ? "text-primary-700" : "text-neutral-900"}`}>
        <IcStar active={active === "awareness"} />
        Awareness
      </button>

      <button onClick={() => router.push("/profile")} className={`flex w-28 flex-col gap-2 items-center text-label font-semibold transition-colors duration-300 ${active === "profile" ? "text-primary-700" : "text-neutral-900"}`}>
        <IcProfile active={active === "profile"} />
        Profile
      </button>
    </div>
  );
}
