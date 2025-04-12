
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HomeIcon, ListIcon, PlusIcon, Settings, ClipboardList, LogOut } from "lucide-react";
import SprintIcon from "../SprintIcon";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut, user } = useAuth();
  
  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Home",
      icon: <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      path: "/tasks",
      label: "Tasks",
      icon: <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      path: "/sprints",
      label: "Sprints",
      icon: <SprintIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      path: "/retrospectives",
      label: "Retros",
      icon: <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
  ];

  // Don't show navbar on splash or login pages when user is not authenticated
  if (location.pathname === "/" && !user) {
    return null;
  }

  // For mobile, limit to 5 items
  const displayItems = isMobile ? navItems.slice(0, 5) : navItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-taskify-grey/20">
      <div className="mx-auto flex h-14 sm:h-16 max-w-2xl items-center justify-around px-2 sm:px-4">
        {displayItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-taskify-blue"
                  : "text-taskify-darkgrey/60 hover:text-taskify-darkgrey"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    "mb-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all",
                    isActive
                      ? "bg-taskify-blue/10"
                      : "bg-transparent group-hover:bg-muted"
                  )}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] sm:text-xs">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
        
        {user && (
          <button
            onClick={() => signOut()}
            className="flex flex-col items-center justify-center rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs font-medium transition-colors text-taskify-darkgrey/60 hover:text-taskify-darkgrey"
          >
            <div className="mb-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all">
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-[10px] sm:text-xs">Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
