
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { SprintProvider } from "./context/SprintContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SplashScreen from "./components/splash/SplashScreen";
import { ScrollArea } from "@/components/ui/scroll-area";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
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
import { RequireAuth } from "./components/auth/RequireAuth";

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
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/tasks" element={<RequireAuth><Tasks /></RequireAuth>} />
            <Route path="/add-task" element={<RequireAuth><AddTask /></RequireAuth>} />
            <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            <Route path="/sprints" element={<RequireAuth><SprintManagement /></RequireAuth>} />
            <Route path="/retrospectives" element={<RequireAuth><SprintRetrospective /></RequireAuth>} />
            <Route path="/settings/privacy" element={<RequireAuth><PrivacySettings /></RequireAuth>} />
            <Route path="/settings/notifications" element={<RequireAuth><NotificationSettings /></RequireAuth>} />
            <Route path="/settings/profile" element={<RequireAuth><ProfileSettings /></RequireAuth>} />
            <Route path="/profile-settings" element={<RequireAuth><ProfileSettingsPage /></RequireAuth>} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
