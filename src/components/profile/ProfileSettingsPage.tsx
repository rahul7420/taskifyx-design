
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  LogOut, 
  Upload, 
  Settings as SettingsIcon
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FadeIn from "@/components/animations/FadeIn";
import Transition from "@/components/animations/Transition";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture: string;
}

const ProfileSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 234 567 8901",
    bio: "Product designer and developer based in San Francisco.",
    profilePicture: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUser({
            ...user,
            profilePicture: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser({ ...user, ...JSON.parse(storedUser) });
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
      }
    }
  }, []);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Transition className="min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <FadeIn direction="down">
          <div className="flex items-center mb-6">
            <button
              onClick={navigateBack}
              className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <Upload className="h-4 w-4" />
                    <input 
                      id="profile-picture" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload} 
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    value={user.email}
                    readOnly
                    className="w-full bg-gray-50 cursor-not-allowed"
                    placeholder="Your email (Google Sign-in)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This email is linked to your Google account and cannot be changed.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <Textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full min-h-[100px]"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={200}>
          <Card className="mb-6">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Notification Settings</h3>
                    <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate("/settings/notifications")}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <SettingsIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                    <p className="text-sm text-gray-500">Manage your privacy and data</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate("/settings/privacy")}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <SettingsIcon className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={300}>
          <Button
            onClick={handleSaveChanges}
            className="w-full mb-4 bg-blue-500 hover:bg-blue-600"
          >
            Save Changes
          </Button>
        </FadeIn>

        <FadeIn delay={400}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access your tasks and projects.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Yes, logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </FadeIn>
      </div>
    </Transition>
  );
};

export default ProfileSettingsPage;
