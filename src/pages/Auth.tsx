
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import LoadingScreen from "@/components/auth/LoadingScreen";
import AuthErrorPopup from "@/components/auth/AuthErrorPopup";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setErrorMessage(error.message);
        setShowError(true);
      } else {
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during sign in");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await signUp(registerEmail, registerPassword, {
        full_name: fullName,
      });
      
      if (error) {
        setErrorMessage(error.message);
        setShowError(true);
      } else {
        toast.success("Registration successful! Please check your email to verify your account.");
        setActiveTab("login");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during registration");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    
    try {
      await signInWithGoogle();
      // Redirect happens in OAuth callback
    } catch (error: any) {
      setIsSubmitting(false);
      setErrorMessage(error.message || "An error occurred during Google sign in");
      setShowError(true);
    }
  };

  if (isSubmitting) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-3 sm:p-4">
      <FadeIn direction="up" delay={100}>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="flex justify-center mb-2">
              <img src="/taskify-logo.svg" alt="TaskifyX Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">TaskifyX</CardTitle>
            <CardDescription className="text-sm text-center">
              Your personal task management solution
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full text-sm h-10">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="full-name"
                        type="text"
                        placeholder="Your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="register-email"
                        type="email"
                        placeholder="Email address"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="register-password"
                        type="password"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 sm:left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <Input 
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-8 sm:pl-10 text-sm h-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full text-sm h-10">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="relative my-4 sm:my-5">
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
              className="w-full text-sm h-10"
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
          
          <CardFooter className="flex flex-col px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
            {/* Footer content if needed */}
          </CardFooter>
        </Card>
      </FadeIn>
      
      <AuthErrorPopup 
        open={showError} 
        onOpenChange={setShowError} 
        onTryAgain={() => setShowError(false)}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Auth;
