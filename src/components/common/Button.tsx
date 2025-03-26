
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient" | "google";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  ...props
}) => {
  const variants = {
    primary: "bg-taskify-blue text-white hover:bg-taskify-blue/90 shadow-sm",
    secondary: "bg-taskify-violet text-white hover:bg-taskify-violet/90 shadow-sm",
    outline: "border border-taskify-grey bg-transparent hover:bg-taskify-grey/10",
    ghost: "bg-transparent hover:bg-taskify-grey/10",
    gradient: "btn-gradient",
    google: "bg-taskify-google text-white hover:bg-taskify-google/90 shadow-sm",
  };

  const sizes = {
    sm: "h-9 px-3 rounded-lg text-sm",
    md: "h-11 px-5 rounded-lg text-base",
    lg: "h-14 px-8 rounded-xl text-lg",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-taskify-blue/20 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span
        className={cn(
          "flex items-center gap-2",
          isLoading && "invisible"
        )}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </button>
  );
};

export default Button;
