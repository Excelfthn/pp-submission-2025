"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  // Check if path matches `/story/:storyId/:chapterId/:sceneId`
  const isScenePage = pathSegments[0] === "story" && pathSegments.length === 4;
  const isAwarenessPage = pathSegments[1] === "awareness";
  const showNavbar = !isScenePage && !isAwarenessPage;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-neutral-50">{children}</main>
      {showNavbar && <Navbar />}
    </div>
  );
}
