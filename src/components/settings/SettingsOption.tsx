
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
  className?: string;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  description,
  onClick,
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50",
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.div>
  );
};

export default SettingsOption;
