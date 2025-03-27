
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import LoadingScreen from "@/components/auth/LoadingScreen";
import AuthErrorPopup from "@/components/auth/AuthErrorPopup";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleGoogleSignIn = () => {
    setSigningIn(true);
    
    // Simulate Google sign-in process
    setTimeout(() => {
      // For demonstration purposes, simulate a successful login 75% of the time
      const success = Math.random() > 0.25;
      
      if (success) {
        // Simulate storing user data
        localStorage.setItem("user", JSON.stringify({
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          profilePicture: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
        }));
        
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      } else {
        setSigningIn(false);
        setShowError(true);
      }
    }, 2000);
  };

  if (signingIn) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {loading ? (
        // Splash screen
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-taskify-blue to-taskify-violet">
          <div className="flex flex-col items-center">
            <FadeIn direction="down" duration={800} delay={100}>
              <h1 className="mb-4 text-5xl font-bold text-white">TaskifyX</h1>
            </FadeIn>
            <FadeIn direction="up" duration={800} delay={500}>
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </FadeIn>
          </div>
        </div>
      ) : (
        // Welcome screen
        <div className="flex h-screen w-full flex-col items-center justify-between bg-white px-6 py-16">
          <div className="mt-16 flex flex-col items-center">
            <FadeIn direction="down" delay={100}>
              <h1 className="text-center text-3xl font-bold text-taskify-darkgrey">
                Welcome to TaskifyX
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="my-4 h-0.5 w-40 bg-taskify-grey/50"></div>
            </FadeIn>
            <FadeIn direction="up" delay={300}>
              <p className="mt-2 max-w-md text-center text-taskify-darkgrey/70">
                The minimalist task management app that helps you stay organized and focused.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={400} className="flex-1 flex items-center">
            <div className="relative h-64 w-64">
              <div className="absolute h-56 w-56 rounded-full bg-taskify-blue/10 animate-pulse" style={{ animationDuration: '3s' }}></div>
              <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-taskify-violet/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-taskify-blue">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={500}>
            <div className="space-y-4">
              <Button 
                variant="google" 
                size="lg" 
                className="w-64"
                onClick={handleGoogleSignIn}
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="#fff"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#fff"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fff"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#fff"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
              >
                Sign in with Google
              </Button>

              <Button 
                variant="gradient" 
                size="lg" 
                className="w-64"
                onClick={handleGetStarted}
                iconPosition="right"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Get Started
              </Button>
            </div>
          </FadeIn>
        </div>
      )}
      
      <AuthErrorPopup 
        open={showError} 
        onOpenChange={setShowError} 
        onTryAgain={handleGoogleSignIn} 
      />
    </div>
  );
};

export default Index;
