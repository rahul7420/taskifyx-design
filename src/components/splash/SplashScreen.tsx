
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically navigate away after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate("/"), 500); // Add a small delay for the fade-out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-taskify-blue to-[#8A2BE2] z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        <FadeIn delay={300} duration={800}>
          <div className="relative w-24 h-24 mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-white drop-shadow-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                fill="currentColor"
                d="M12 6v6l4 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-30"></div>
          </div>
        </FadeIn>

        <FadeIn delay={600} duration={800}>
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-md font-poppins">
            TaskifyX
          </h1>
        </FadeIn>

        <FadeIn delay={900} duration={800}>
          <p className="text-[#E0E0E0] text-base font-medium font-poppins">
            Your Agile Project Manager
          </p>
        </FadeIn>

        <FadeIn delay={1100} duration={800}>
          <p className="text-[#F0F0F0] text-lg font-semibold font-poppins italic">
            Simplify, Track, Achieve!
          </p>
        </FadeIn>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
