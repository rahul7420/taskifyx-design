
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@/components/common/Button";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-taskify-blue to-taskify-violet p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 backdrop-blur-lg">
        <FadeIn direction="down" className="text-center">
          <h1 className="text-7xl font-bold text-taskify-darkgrey">404</h1>
          <div className="my-4 h-0.5 w-16 bg-taskify-grey/50 mx-auto"></div>
          <p className="text-xl text-taskify-darkgrey mb-8">
            Oops! Page not found
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            onClick={() => navigate("/dashboard")}
            icon={<ArrowLeft className="h-5 w-5" />}
          >
            Back to Dashboard
          </Button>
        </FadeIn>
      </div>
    </div>
  );
};

export default NotFound;
