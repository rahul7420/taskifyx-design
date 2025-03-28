
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Edit, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [privacyExpanded, setPrivacyExpanded] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBackNavigation = () => {
    navigate("/settings");
    console.log("Navigating back to settings page");
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    navigate("/settings");
  };

  const handleEditEmail = () => {
    if (isEditingEmail) {
      // Save email logic would go here
      toast.success("Email updated successfully!");
      setIsEditingEmail(false);
    } else {
      setIsEditingEmail(true);
    }
  };

  const handleCancelEmailEdit = () => {
    setEmail("alex.johnson@example.com"); // Reset to original
    setIsEditingEmail(false);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    
    if (currentPassword.length < 6 || newPassword.length < 6) {
      toast.error("Passwords must be at least 6 characters!");
      return;
    }
    
    // Password change logic would go here
    toast.success("Password changed successfully!");
    setIsChangePasswordOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${isEditingEmail ? 'bg-white' : 'bg-gray-50'}`}
                  placeholder="Enter your email"
                  readOnly={!isEditingEmail}
                />
                {isEditingEmail ? (
                  <div className="flex ml-2">
                    <button
                      onClick={handleEditEmail}
                      className="p-2 text-green-600 hover:bg-green-50 rounded mr-1"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancelEmailEdit}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditEmail}
                    className="ml-2 p-2 text-taskify-blue hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <Button
              onClick={() => setIsChangePasswordOpen(true)}
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

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;
