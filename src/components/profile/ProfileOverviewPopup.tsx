
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, LogOut } from "lucide-react";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/useUserProfile";
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
  const { profile, getFullName, getAvatarCharacter, getAvatarUrl } = useUserProfile();

  const handleViewProfile = () => {
    onOpenChange(false);
    navigate("/profile-settings");
    toast.info("Navigating to profile settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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
          <Avatar className="w-[90px] h-[90px] border-4 border-white shadow-md bg-purple-700">
            {getAvatarUrl() ? (
              <AvatarImage src={getAvatarUrl() || ""} alt="Profile" className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-purple-700 text-white text-3xl font-bold">
              {getAvatarCharacter()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold">{getFullName()}</h2>
          <p className="text-[#9E9E9E] text-sm">{profile?.bio || "No bio yet"}</p>
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
