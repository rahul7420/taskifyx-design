
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HomeIcon, ListIcon, PlusIcon, Settings } from "lucide-react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      path: "/dashboard",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      path: "/tasks",
      label: "Tasks",
      icon: <ListIcon className="h-5 w-5" />,
    },
    {
      path: "/add-task",
      label: "Add",
      icon: <PlusIcon className="h-5 w-5" />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Don't show navbar on splash or login pages
  if (location.pathname === "/" || location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-taskify-grey/20">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center rounded-md px-3 py-2 text-xs font-medium transition-colors",
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
                    "mb-1 flex h-8 w-8 items-center justify-center rounded-full transition-all",
                    isActive
                      ? "bg-taskify-blue/10"
                      : "bg-transparent group-hover:bg-muted"
                  )}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
