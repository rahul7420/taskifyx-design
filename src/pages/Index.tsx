
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import LoadingScreen from "@/components/auth/LoadingScreen";
import AuthErrorPopup from "@/components/auth/AuthErrorPopup";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [showError, setShowError] = useState(false);

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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    
    // Simulate email/password sign-in process
    setTimeout(() => {
      if (email && password) {
        // Simulate storing user data
        localStorage.setItem("user", JSON.stringify({
          name: "Alex Johnson",
          email: email,
          profilePicture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
        }));
        
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      } else {
        setSigningIn(false);
        setShowError(true);
      }
    }, 1500);
  };

  if (signingIn) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <FadeIn direction="up" delay={100}>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">TaskifyX</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setRememberMe(checked);
                    }
                  }}
                />
                <label htmlFor="remember-me" className="text-sm text-gray-500 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              type="button" 
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              variant="ghost" 
              type="button" 
              className="text-sm text-gray-500 hover:text-gray-900 w-full"
              onClick={handleGetStarted}
            >
{/*               Continue without signing in */}
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
      
      <AuthErrorPopup 
        open={showError} 
        onOpenChange={setShowError} 
        onTryAgain={() => setShowError(false)} 
      />
    </div>
  );
};

export default Index;
