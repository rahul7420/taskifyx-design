
import React from "react";
import { ArrowLeft } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Transition from "@/components/animations/Transition";
import { useNavigate } from "react-router-dom";
import ProfileIconEditor from "./ProfileIconEditor";
import { toast } from "sonner";

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate("/settings");
  };

  return (
    <Transition className="min-h-screen pb-20 pt-6 bg-taskify-lightgrey">
      <div className="mobile-container">
        <FadeIn direction="down">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackNavigation}
              className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Back to settings"
            >
              <ArrowLeft className="h-6 w-6 text-taskify-darkgrey font-bold" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold text-taskify-darkgrey">Profile Settings</h2>
          </div>
        </FadeIn>

        <div className="space-y-6">
          <FadeIn delay={100}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ProfileIconEditor />
            </div>
          </FadeIn>
        </div>
      </div>
    </Transition>
  );
};

export default ProfileSettingsPage;
