
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import Transition from "@/components/animations/Transition";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Transition className="min-h-screen">
      <div className="container px-4 py-8 mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] gap-8">
          <FadeIn direction="down">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-taskify-blue">
                Welcome to Lovable AI
              </h1>
              <p className="text-lg md:text-xl text-taskify-darkgrey max-w-2xl">
                Your intelligent assistant for meaningful conversations
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-taskify-blue hover:bg-taskify-blue/90"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-taskify-blue text-taskify-blue hover:bg-taskify-blue/10"
                onClick={() => navigate("/auth")}
              >
                Log In
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </Transition>
  );
};

export default Index;
