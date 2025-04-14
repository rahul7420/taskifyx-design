
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const ProfileIconEditor: React.FC = () => {
  const { user } = useAuth();
  const { 
    getAvatarCharacter, 
    getAvatarUrl, 
    updateCustomAvatar, 
    updateCustomIconLetter,
    resetToDefault
  } = useUserProfile();
  
  const [isUploading, setIsUploading] = useState(false);
  const [customLetter, setCustomLetter] = useState("");
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type and size
    if (!file.type.includes('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image file size should be less than 5MB");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Define a unique file path in the storage bucket
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: urlData } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      // Update profile with new avatar URL
      const { error } = await updateCustomAvatar(urlData.publicUrl);
      
      if (error) {
        throw new Error(error);
      }
      
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleUpdateLetter = async () => {
    if (customLetter.trim() === "") {
      toast.error("Please enter a letter");
      return;
    }
    
    const { error } = await updateCustomIconLetter(customLetter.trim());
    
    if (error) {
      toast.error(error);
    } else {
      toast.success("Profile icon letter updated successfully");
      setCustomLetter("");
    }
  };
  
  const handleResetToDefault = async () => {
    const { error } = await resetToDefault();
    
    if (error) {
      toast.error(error);
    } else {
      toast.success("Profile reset to default");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24 border-4 border-white shadow-md bg-purple-700">
          {getAvatarUrl() ? (
            <AvatarImage src={getAvatarUrl() || ""} alt="Profile" className="object-cover" />
          ) : null}
          <AvatarFallback className="bg-purple-700 text-white text-3xl font-bold">
            {getAvatarCharacter()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h3 className="font-medium text-gray-800">Profile Icon</h3>
          <p className="text-sm text-gray-500">Customize how you appear in the app</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Upload Custom Avatar</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-10 hover:border-blue-500 transition-colors">
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-500">Choose file</span>
                </div>
                <Input 
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </Label>
            </div>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={handleResetToDefault}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
          {isUploading && (
            <p className="text-xs text-blue-600 mt-1">Uploading...</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG or GIF. Max 5MB.
          </p>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Or Use Custom Letter</h4>
          <div className="flex items-center gap-2">
            <Input 
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value.slice(0, 1))}
              placeholder="Enter a letter"
              maxLength={1}
              className="flex-1"
            />
            <Button 
              onClick={handleUpdateLetter}
              size="sm"
            >
              Set
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Only the first character will be used. It will be displayed when no custom image is set.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileIconEditor;
