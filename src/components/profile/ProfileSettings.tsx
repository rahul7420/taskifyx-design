
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit, ChevronDown, ChevronUp } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Alex Johnson");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [privacyExpanded, setPrivacyExpanded] = useState(false);

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  const handleEditEmail = () => {
    toast.info("Email editing coming soon!");
  };

  const handleChangePassword = () => {
    toast.info("Password change feature coming soon!");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <FadeIn direction="down">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/settings")}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-taskify-darkgrey" />
          </button>
          <h2 className="text-xl font-bold text-taskify-darkgrey">Profile Settings</h2>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-taskify-blue text-white p-1.5 rounded-full">
              <Edit className="h-4 w-4" />
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center">
                <Input
                  value="alex.johnson@example.com"
                  readOnly
                  className="w-full bg-gray-50"
                />
                <button
                  onClick={handleEditEmail}
                  className="ml-2 p-2 text-taskify-blue hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              variant="outline"
              className="w-full"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={300}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Theme Preferences</h3>
                <p className="text-sm text-gray-500">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </p>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={400}>
        <Card>
          <CardContent className="p-6">
            <button
              onClick={() => setPrivacyExpanded(!privacyExpanded)}
              className="flex items-center justify-between w-full"
            >
              <div>
                <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                <p className="text-sm text-gray-500">Manage your privacy preferences</p>
              </div>
              {privacyExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {privacyExpanded && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Show profile to others</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Allow email notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Show online status</p>
                  </div>
                  <Switch />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={500}>
        <div className="flex space-x-4">
          <Button
            onClick={handleSave}
            className="w-full"
          >
            Save Changes
          </Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default ProfileSettings;
