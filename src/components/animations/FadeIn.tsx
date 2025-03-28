
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  once?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 600, // Increased duration for smoother transitions
  direction = "up",
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getAnimationClass = () => {
    switch (direction) {
      case "up":
        return "animate-slideUp";
      case "down":
        return "animate-slideDown";
      case "left":
        return "animate-slideLeft";
      case "right":
        return "animate-slideRight";
      case "none":
        return "animate-fadeIn";
      default:
        return "animate-slideUp";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && getAnimationClass(),
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)", // Smoother easing
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
