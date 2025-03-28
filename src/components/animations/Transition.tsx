
import React from "react";
import { motion } from "framer-motion";

interface TransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Enhanced page transition animations with medium smoothness
const variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Medium transition duration (slightly longer)
      ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smoother motion
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3, // Slightly faster exit
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Transition: React.FC<TransitionProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
