
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

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
      <div className="flex flex-col items-center justify-center space-y-6 p-4 sm:p-8">
        <FadeIn delay={300} duration={800}>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2 sm:mb-4">
            <img 
              src="/taskify-logo.svg" 
              alt="TaskifyX Logo" 
              className="w-full h-full drop-shadow-lg"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-lg opacity-30 bg-white"></div>
          </div>
        </FadeIn>

        <FadeIn delay={600} duration={800}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-md font-poppins">
            TaskifyX
          </h1>
        </FadeIn>

        <FadeIn delay={900} duration={800}>
          <p className="text-sm sm:text-base text-[#E0E0E0] font-medium font-poppins">
            Organize. Track. Succeed
          </p>
        </FadeIn>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
