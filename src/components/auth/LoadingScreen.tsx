
import React from "react";
import { Loader } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-taskify-blue to-taskify-violet">
      <div className="flex flex-col items-center">
        <FadeIn direction="down" duration={800} delay={100}>
          <Loader className="h-12 w-12 animate-spin text-white" />
        </FadeIn>
        <FadeIn direction="up" duration={800} delay={300}>
          <p className="mt-4 text-center text-base font-medium text-white">
            Signing in... Please wait
          </p>
        </FadeIn>
      </div>
    </div>
  );
};

export default LoadingScreen;
