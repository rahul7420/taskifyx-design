
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";
import SettingsOption from "@/components/settings/SettingsOption";

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

const Settings = () => {
  const navigate = useNavigate();
  const [showProfileOverview, setShowProfileOverview] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Transition className="min-h-screen pb-16 sm:pb-20 pt-6 sm:pt-8 bg-taskify-lightgrey">
      <div className="mobile-container">
        <header className="mb-4 sm:mb-6">
          <FadeIn direction="down">
            <h2 className="mobile-heading text-gray-800">Settings</h2>
            <p className="mobile-subheading text-gray-500">
              Customize your TaskifyX experience
            </p>
          </FadeIn>
        </header>

        <div className="mobile-card-spacing">
          {/* Profile Settings */}
          <SettingsOption
            icon={<User className="h-4 w-4 sm:h-5 sm:w-5 text-taskify-blue" />}
            title="Profile Settings"
            description="Manage your profile information"
            onClick={() => navigate("/settings/profile")}
            delay={100}
            className="bg-white hover:bg-gray-50"
          />

          {/* Notification Settings */}
          <SettingsOption
            icon={<Bell className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />}
            title="Notification Settings"
            description="Manage your notifications"
            onClick={() => navigate("/settings/notifications")}
            delay={200}
            className="bg-white hover:bg-gray-50"
          />

          {/* Privacy Settings */}
          <SettingsOption
            icon={<Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
            title="Privacy Settings"
            description="Manage your privacy and data"
            onClick={() => navigate("/settings/privacy")}
            delay={300}
            className="bg-white hover:bg-gray-50"
          />
        </div>

        {/* Logout Button with Confirmation */}
        <FadeIn delay={400} direction="up" className="mt-6 sm:mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-red-300 text-red-500 text-sm sm:text-base hover:bg-red-50 bg-white"
                icon={<LogOut className="h-4 w-4 sm:h-5 sm:w-5" />}
              >
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90%] sm:max-w-md mx-auto bg-white text-gray-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg text-gray-800">Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-600">
                  You will need to sign in again to access your tasks and projects.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-xs sm:text-sm bg-white text-gray-800 hover:bg-gray-100">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="text-xs sm:text-sm bg-red-500 text-white hover:bg-red-600"
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
