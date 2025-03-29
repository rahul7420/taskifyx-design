
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";

// Import UI components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SettingsOption: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}> = ({ icon, title, description, onClick, delay = 0 }) => (
  <FadeIn delay={delay} direction="right">
    <button
      className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md dark:bg-taskify-darkgrey dark:text-white dark:hover:bg-taskify-darkgrey/80"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-taskify-blue/10 dark:bg-taskify-blue/20">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-taskify-darkgrey dark:text-white">{title}</h3>
          <p className="text-sm text-taskify-darkgrey/60 dark:text-white/60">{description}</p>
        </div>
      </div>
    </button>
  </FadeIn>
);

const Settings = () => {
  const navigate = useNavigate();
  const [showProfileOverview, setShowProfileOverview] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Transition className="min-h-screen pb-20 pt-8 dark:bg-taskify-darkgrey">
      <div className="mx-auto max-w-md px-4">
        <header className="mb-6">
          <FadeIn direction="down">
            <h2 className="text-xl font-bold text-taskify-darkgrey dark:text-white">Settings</h2>
            <p className="text-sm text-taskify-darkgrey/60 dark:text-white/60">
              Customize your TaskifyX experience
            </p>
          </FadeIn>
        </header>

        <div className="space-y-4">
          {/* Profile Settings */}
          <SettingsOption
            icon={<User className="h-5 w-5 text-taskify-blue dark:text-taskify-blue" />}
            title="Profile Settings"
            description="Manage your profile information"
            onClick={() => navigate("/settings/profile")}
            delay={100}
          />

          {/* Notification Settings */}
          <SettingsOption
            icon={<Bell className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
            title="Notification Settings"
            description="Manage your notifications"
            onClick={() => navigate("/settings/notifications")}
            delay={200}
          />

          {/* Privacy Settings */}
          <SettingsOption
            icon={<Shield className="h-5 w-5 text-green-500 dark:text-green-400" />}
            title="Privacy Settings"
            description="Manage your privacy and data"
            onClick={() => navigate("/settings/privacy")}
            delay={300}
          />
        </div>

        {/* Logout Button with Confirmation */}
        <FadeIn delay={400} direction="up" className="mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-red-300 text-red-500 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                icon={<LogOut className="h-5 w-5" />}
              >
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-taskify-darkgrey dark:text-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="dark:text-white">Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription className="dark:text-white/60">
                  You will need to sign in again to access your tasks and projects.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="dark:bg-taskify-darkgrey dark:text-white dark:hover:bg-taskify-darkgrey/80">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                  onClick={handleLogout}
                >
                  Yes, logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </FadeIn>
      </div>

      {/* Profile Overview Popup */}
      <ProfileOverviewPopup 
        open={showProfileOverview} 
        onOpenChange={setShowProfileOverview} 
      />
    </Transition>
  );
};

export default Settings;
