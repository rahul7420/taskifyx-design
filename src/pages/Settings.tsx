import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Moon, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark" | "custom">("light");

  // Load theme from localStorage or default to 'light'
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark" | "custom");
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Apply theme change logic
  const applyTheme = (selectedTheme: "light" | "dark" | "custom") => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.body.classList.toggle("dark", selectedTheme === "dark");
    toast.success(`${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} theme applied!`);
  };

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
                <RadioGroup value={theme} onValueChange={applyTheme}>
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
                <Button onClick={() => applyTheme(theme)}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Transition>
  );
};

export default Settings;
