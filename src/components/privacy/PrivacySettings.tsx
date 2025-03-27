
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();
  const [showProfileToOthers, setShowProfileToOthers] = useState(true);
  const [shareTaskActivity, setShareTaskActivity] = useState(false);
  const [allowDataCollection, setAllowDataCollection] = useState(true);
  
  const handleSave = () => {
    toast.success("Privacy settings saved successfully!");
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-taskify-lightgrey pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <FadeIn direction="down">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/settings")}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-taskify-darkgrey" />
            </button>
            <h2 className="text-xl font-bold text-taskify-darkgrey">Privacy Settings</h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {/* Privacy Options */}
          <FadeIn delay={100}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-taskify-darkgrey mb-2">Profile Privacy</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Show Profile to Others</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Allow other users to view your profile information
                      </p>
                    </div>
                    <Switch 
                      checked={showProfileToOthers}
                      onCheckedChange={setShowProfileToOthers}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Share Task Activity</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Let others see your recent task activity
                      </p>
                    </div>
                    <Switch 
                      checked={shareTaskActivity}
                      onCheckedChange={setShareTaskActivity}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Data Collection */}
          <FadeIn delay={200}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-taskify-darkgrey mb-2">Data & Analytics</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Allow Data Collection</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Help us improve by allowing anonymous usage data
                      </p>
                    </div>
                    <Switch 
                      checked={allowDataCollection}
                      onCheckedChange={setAllowDataCollection}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Detailed Privacy Policy */}
          <FadeIn delay={300}>
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="privacy-policy">
                    <AccordionTrigger className="text-taskify-darkgrey">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                          <Lock className="h-4 w-4 text-green-500" />
                        </div>
                        <span>Privacy Policy</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-taskify-darkgrey/70 pl-11">
                      <p className="mb-2">
                        Our Privacy Policy describes how we handle your personal information when you use TaskifyX.
                      </p>
                      <p className="mb-2">
                        We collect and process only the minimum amount of data necessary to provide our services. 
                        This includes account information, task data, and usage analytics if you've enabled them.
                      </p>
                      <p>
                        For more information, please contact our support team at privacy@taskifyx.com
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Data Access Options */}
          <FadeIn delay={400}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-taskify-blue/10">
                    <Eye className="h-5 w-5 text-taskify-blue" />
                  </div>
                  <h3 className="font-medium text-taskify-darkgrey">Your Data</h3>
                </div>
                
                <div className="pl-12 space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left"
                    onClick={() => toast.info("Request data feature coming soon")}
                  >
                    Request a copy of your data
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => toast.info("Delete account feature coming soon")}
                  >
                    Delete your account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Save Button */}
          <FadeIn delay={500} direction="up" className="mt-8">
            <Button
              onClick={handleSave}
              className="w-full"
            >
              Save Changes
            </Button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
