"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getNavigationDirection } from "../utils/NavigationDirection";
export default function PageTransitionWrapper({ children, transitionType = "slide" }) {
  const pathname = usePathname();
  const direction = getNavigationDirection();

  const slideVariants = {
    initial: { x: direction === "forward" ? "100%" : "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: direction === "forward" ? "-100%" : "100%", opacity: 0 },
  };

  const dissolveVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const selectedVariants = transitionType === "dissolve" ? dissolveVariants : slideVariants;

  return (
    <div className="relative overflow-hidden w-full h-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={selectedVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4, ease: "easeOut" }} className="w-full min-h-screen">
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

