
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-3 sm:p-4">
      <FadeIn direction="up" delay={100}>
        <Card className="w-full max-w-sm sm:max-w-md shadow-lg">
          <CardHeader className="space-y-1 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="flex justify-center mb-2">
              <img src="/taskify-logo.svg" alt="TaskifyX Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">TaskifyX</CardTitle>
            <CardDescription className="text-sm text-center">
              Your personal task management solution
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 py-4">
            <p className="text-center text-sm text-gray-600 mb-6">
              Track your tasks, manage sprints, and boost your productivity with TaskifyX.
            </p>
            <Button onClick={handleGetStarted} className="w-full">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
            <p className="text-xs text-center text-gray-500 mt-2">
              Start organizing your tasks today and see the difference.
            </p>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export default Index;
