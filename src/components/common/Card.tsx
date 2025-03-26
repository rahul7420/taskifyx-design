
import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "../animations/FadeIn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "todo" | "inprogress" | "completed" | "upcoming" | "glass";
  onClick?: () => void;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  onClick,
  delay = 0,
}) => {
  const variants = {
    default: "bg-white",
    todo: "bg-taskify-todo",
    inprogress: "bg-taskify-inprogress",
    completed: "bg-taskify-completed",
    upcoming: "bg-taskify-upcoming",
    glass: "glass",
  };

  return (
    <FadeIn delay={delay} duration={400}>
      <div
        className={cn(
          "task-card rounded-xl shadow-sm transition-transform duration-200 hover:shadow-md",
          onClick && "cursor-pointer hover:translate-y-[-2px]",
          variants[variant],
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </FadeIn>
  );
};

export default Card;
