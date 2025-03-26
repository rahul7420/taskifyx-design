
import React from "react";
import { useNavigate } from "react-router-dom";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";
import { User, Bell, Moon, Shield, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { toast } from "sonner";

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

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const showComingSoon = (feature: string) => {
    toast.info(`${feature} will be available soon!`);
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
          <SettingsOption
            icon={<User className="h-5 w-5 text-taskify-blue" />}
            title="Profile Settings"
            description="Manage your profile information"
            onClick={() => showComingSoon("Profile settings")}
            delay={100}
          />

          <SettingsOption
            icon={<Moon className="h-5 w-5 text-taskify-violet" />}
            title="Theme Preferences"
            description="Customize app appearance"
            onClick={() => showComingSoon("Theme preferences")}
            delay={200}
          />

          <SettingsOption
            icon={<Bell className="h-5 w-5 text-orange-500" />}
            title="Notification Settings"
            description="Manage your notifications"
            onClick={() => showComingSoon("Notification settings")}
            delay={300}
          />

          <SettingsOption
            icon={<Shield className="h-5 w-5 text-green-500" />}
            title="Privacy Policy"
            description="Read our privacy policy"
            onClick={() => showComingSoon("Privacy policy")}
            delay={400}
          />
        </div>

        <FadeIn delay={500} direction="up" className="mt-8">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-red-300 text-red-500 hover:bg-red-50"
            icon={<LogOut className="h-5 w-5" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </FadeIn>
      </div>
    </Transition>
  );
};

export default Settings;
