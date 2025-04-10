
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { SprintProvider } from "./context/SprintContext";
import Navbar from "./components/layout/Navbar";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SplashScreen from "./components/splash/SplashScreen";
import { ScrollArea } from "@/components/ui/scroll-area";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SprintManagement from "./pages/SprintManagement";
import SprintRetrospective from "./pages/SprintRetrospective";
import PrivacySettings from "./components/privacy/PrivacySettings";
import NotificationSettings from "./components/notifications/NotificationSettings";
import ProfileSettings from "./components/profile/ProfileSettings";
import ProfileSettingsPage from "./components/profile/ProfileSettingsPage";

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
    <ScrollArea className="h-screen w-full">
      <div className="content-container">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sprints" element={<SprintManagement />} />
            <Route path="/retrospectives" element={<SprintRetrospective />} />
            <Route path="/settings/privacy" element={<PrivacySettings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TaskProvider>
      <SprintProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimationLayout />
            <Navbar />
          </BrowserRouter>
        </TooltipProvider>
      </SprintProvider>
    </TaskProvider>
  </QueryClientProvider>
);

export default App;
