
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Moon, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";
import ProfileSettings from "@/components/profile/ProfileSettings";
import NotificationSettings from "@/components/notifications/NotificationSettings";

// Import UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const SettingsOption: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}> = ({ icon, title, description, onClick, delay = 0 }) => (
  <FadeIn delay={delay} direction="right">
    <button
      className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-taskify-blue/10">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-taskify-darkgrey">{title}</h3>
          <p className="text-sm text-taskify-darkgrey/60">{description}</p>
        </div>
      </div>
    </button>
  </FadeIn>
);

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark" | "custom">("light");
  const [showProfileOverview, setShowProfileOverview] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const showComingSoon = (feature: string) => {
    toast.info(`${feature} will be available soon!`);
  };

  if (showProfileSettings) {
    return <ProfileSettings />;
  }

  if (showNotificationSettings) {
    return <NotificationSettings />;
  }

  return (
    <Transition className="min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <header className="mb-6">
          <FadeIn direction="down">
            <h2 className="text-xl font-bold text-taskify-darkgrey">Settings</h2>
            <p className="text-sm text-taskify-darkgrey/60">
              Customize your TaskifyX experience
            </p>
          </FadeIn>
        </header>

        <div className="space-y-4">
          {/* Profile Settings */}
          <SettingsOption
            icon={<User className="h-5 w-5 text-taskify-blue" />}
            title="Profile Settings"
            description="Manage your profile information"
            onClick={() => setShowProfileSettings(true)}
            delay={100}
          />

          {/* Theme Preferences */}
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <SettingsOption
                  icon={<Moon className="h-5 w-5 text-taskify-violet" />}
                  title="Theme Preferences"
                  description="Customize app appearance"
                  onClick={() => {}}
                  delay={200}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Theme Preferences</DialogTitle>
                <DialogDescription>
                  Choose your preferred theme for the application.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <RadioGroup value={theme} onValueChange={(value: "light" | "dark" | "custom") => setTheme(value)}>
                  <div className="flex items-start space-x-2 space-y-0 mb-4">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="font-normal cursor-pointer">
                      <div className="font-medium mb-1">Light Mode</div>
                      <p className="text-sm text-muted-foreground">
                        A clean, light theme that's easy on the eyes during the day.
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 space-y-0 mb-4">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="font-normal cursor-pointer">
                      <div className="font-medium mb-1">Dark Mode</div>
                      <p className="text-sm text-muted-foreground">
                        A darker theme that's perfect for late-night productivity.
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 space-y-0">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal cursor-pointer">
                      <div className="font-medium mb-1">Custom Theme</div>
                      <p className="text-sm text-muted-foreground">
                        Customize colors and appearance to your preference.
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    toast.success(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`);
                  }}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Notification Settings */}
          <SettingsOption
            icon={<Bell className="h-5 w-5 text-orange-500" />}
            title="Notification Settings"
            description="Manage your notifications"
            onClick={() => setShowNotificationSettings(true)}
            delay={300}
          />

          {/* Privacy Policy */}
          <SettingsOption
            icon={<Shield className="h-5 w-5 text-green-500" />}
            title="Privacy Policy"
            description="Read our privacy policy"
            onClick={() => showComingSoon("Privacy policy")}
            delay={400}
          />
        </div>

        {/* Logout Button with Confirmation */}
        <FadeIn delay={500} direction="up" className="mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-red-300 text-red-500 hover:bg-red-50"
                icon={<LogOut className="h-5 w-5" />}
              >
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your tasks and projects.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600"
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
