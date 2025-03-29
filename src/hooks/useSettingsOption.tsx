
import React from "react";
import FadeIn from "@/components/animations/FadeIn";

interface SettingsOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}

export const useSettingsOption = () => {
  const SettingsOption: React.FC<SettingsOptionProps> = ({ 
    icon, 
    title, 
    description, 
    onClick, 
    delay = 0 
  }) => (
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

  return SettingsOption;
};
