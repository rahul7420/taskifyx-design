import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Moon, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";

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
  const [theme, setTheme] = useState<"light" | "dark" | "custom">("light");
  const [showProfileOverview, setShowProfileOverview] = useState(false);

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "custom" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const showComingSoon = (feature: string) => {
    toast.info(`${feature} will be available soon!`);
  };

  const applyTheme = () => {
    toast.success(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`);
    if (theme === "custom") {
      showComingSoon("Custom theme");
    }
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

          {/* Theme Preferences */}
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <SettingsOption
                  icon={<Moon className="h-5 w-5 text-taskify-violet dark:text-taskify-violet" />}
                  title="Theme Preferences"
                  description="Customize app appearance"
                  onClick={() => {}}
                  delay={200}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-taskify-darkgrey dark:text-white">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Theme Preferences</DialogTitle>
                <DialogDescription className="dark:text-white/60">
                  Choose your preferred theme for the application.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <RadioGroup 
                  value={theme} 
                  onValueChange={(value: "light" | "dark" | "custom") => setTheme(value)}
                >
                  <div className="flex items-start space-x-2 space-y-0 mb-4">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="font-normal cursor-pointer dark:text-white">
                      <div className="font-medium mb-1">Light Mode</div>
                      <p className="text-sm text-muted-foreground dark:text-white/60">
                        A clean, light theme that's easy on the eyes during the day.
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 space-y-0 mb-4">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="font-normal cursor-pointer dark:text-white">
                      <div className="font-medium mb-1">Dark Mode</div>
                      <p className="text-sm text-muted-foreground dark:text-white/60">
                        A darker theme that's perfect for late-night productivity.
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 space-y-0">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal cursor-pointer dark:text-white">
                      <div className="font-medium mb-1">Custom Theme</div>
                      <p className="text-sm text-muted-foreground dark:text-white/60">
                        Customize colors and appearance to your preference.
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button onClick={applyTheme}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Notification Settings */}
          <SettingsOption
            icon={<Bell className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
            title="Notification Settings"
            description="Manage your notifications"
            onClick={() => navigate("/settings/notifications")}
            delay={300}
          />

          {/* Privacy Settings */}
          <SettingsOption
            icon={<Shield className="h-5 w-5 text-green-500 dark:text-green-400" />}
            title="Privacy Settings"
            description="Manage your privacy and data"
            onClick={() => navigate("/settings/privacy")}
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
