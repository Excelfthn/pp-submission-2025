import { motion } from "framer-motion";

export default function SlideUpAnimation({ children, className = "", delay = 0, duration = 0.6, transition = {}, ...props }) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay,
          duration,
          ease: [0.16, 0.77, 0.47, 0.97],
          ...transition,
        },
      }}
      exit={{
        y: "100%",
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: "easeIn",
        },
      }}
      transition={{
        type: "spring",
        damping: 20, // Slightly less damping for more fluid motion
        stiffness: 100, // Softer spring
        mass: 0.5, // Adds weight to the animation
        bounce: 0.25, // Subtle bounce at the end
        ...transition,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}