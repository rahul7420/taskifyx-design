
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProfileOverviewPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileOverviewPopup: React.FC<ProfileOverviewPopupProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    onOpenChange(false);
    navigate("/settings");
    toast.info("Navigating to profile settings");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xl w-[380px] h-[450px] p-6 flex flex-col items-center relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-[90px] h-[90px] rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-bold">Alex Johnson</h2>
          <p className="text-[#9E9E9E] text-sm">alex.johnson@example.com</p>
        </div>

        <div className="mt-auto w-full space-y-4">
          <Button
            onClick={handleViewProfile}
            className="w-full bg-[#3B82F6] text-white rounded-lg"
          >
            View Profile
          </Button>
          
          <Button
            onClick={handleLogout}
            className="w-full bg-[#EF4444] text-white rounded-lg"
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileOverviewPopup;
