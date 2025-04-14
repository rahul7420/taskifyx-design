
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
  showWhenAuth?: boolean;
  action?: () => void; // Add the missing action property
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  
  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Home",
      icon: <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      showWhenAuth: true,
    },
    {
      path: "/tasks",
      label: "Tasks",
      icon: <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      showWhenAuth: true,
    },
    {
      path: "/sprints",
      label: "Sprints",
      icon: <SprintIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      showWhenAuth: true,
    },
    {
      path: "/retrospectives",
      label: "Retros",
      icon: <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" />,
      showWhenAuth: true,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
      showWhenAuth: true,
    },
  ];

  // Logout item (not a route)
  const logoutItem: NavItem = {
    path: "#",
    label: "Logout",
    icon: <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />,
    action: signOut,
  };

  // Don't show navbar on splash or login pages
  if (location.pathname === "/") {
    return null;
  }

  // Filter items based on auth status
  const filteredItems = navItems.filter(item => {
    if (item.showWhenAuth === undefined) return true;
    return item.showWhenAuth === !!user;
  });

  // For mobile, limit to 5 items
  const displayItems = isMobile ? filteredItems.slice(0, 4) : filteredItems;
  
  // Add logout for authenticated users
  if (user) {
    if (isMobile && displayItems.length >= 4) {
      // If we already have 4 items on mobile, replace the last one with logout
      displayItems[displayItems.length - 1] = logoutItem;
    } else {
      // Otherwise just add the logout item
      displayItems.push(logoutItem);
    }
  }

  // If no user and no items to display, don't render navbar
  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-taskify-grey/20">
      <div className="mx-auto flex h-14 sm:h-16 max-w-2xl items-center justify-around px-2 sm:px-4">
        {displayItems.map((item) => (
          <div key={item.path} className="flex-1">
            {item.action ? (
              <button
                onClick={item.action}
                className="flex w-full flex-col items-center justify-center rounded-md px-2 sm:px-3 py-1 sm:py-2 text-xs font-medium text-taskify-darkgrey/60 hover:text-taskify-darkgrey transition-colors"
              >
                <div className="mb-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all hover:bg-muted">
                  {item.icon}
                </div>
                <span className="text-[10px] sm:text-xs">{item.label}</span>
              </button>
            ) : (
              <NavLink
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
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
