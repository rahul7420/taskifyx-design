
import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

interface AnimationLayoutProps {
  children: React.ReactNode;
}

const AnimationLayout: React.FC<AnimationLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, { key: location.pathname });
      })}
    </AnimatePresence>
  );
};

export default AnimationLayout;
