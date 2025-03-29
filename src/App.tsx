
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/layout/Navbar";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SplashScreen from "./components/splash/SplashScreen";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PrivacySettings from "./components/privacy/PrivacySettings";
import NotificationSettings from "./components/notifications/NotificationSettings";
import ProfileSettings from "./components/profile/ProfileSettings";

const queryClient = new QueryClient();

// AnimationLayout component to handle route transitions
const AnimationLayout = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Hide splash screen after 3.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (showSplash) {
    return <SplashScreen />;
  }
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/privacy" element={<PrivacySettings />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TaskProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimationLayout />
          <Navbar />
        </BrowserRouter>
      </TooltipProvider>
    </TaskProvider>
  </QueryClientProvider>
);

export default App;
