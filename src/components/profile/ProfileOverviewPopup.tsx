
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileOverviewPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileOverviewPopup: React.FC<ProfileOverviewPopupProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const { profile, getDisplayName, getAvatarInitial } = useUserProfile();
  const { signOut } = useAuth();
  
  const handleViewProfile = () => {
    onOpenChange(false);
    navigate("/profile-settings");
    toast.info("Navigating to profile settings");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xl w-[380px] p-6 flex flex-col items-center relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Avatar className="w-[90px] h-[90px] border-2 border-white shadow-md">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-[#9b87f5] text-white text-3xl font-bold">
              {getAvatarInitial()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold">{getDisplayName()}</h2>
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
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileOverviewPopup;
