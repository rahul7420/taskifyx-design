import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Volume2, ChevronRight, Clock } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [taskReminders, setTaskReminders] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [sprintUpdates, setSprintUpdates] = useState(false);
  const [generalNotifications, setGeneralNotifications] = useState(true);
  const [silentMode, setSilentMode] = useState(false);
  const [frequency, setFrequency] = useState("daily");

  const handleBackNavigation = () => {
    navigate("/settings");
    console.log("Navigating back to settings page");
  };

  const handleSave = () => {
    toast.success("Notification settings saved successfully!");
    navigate("/settings");
  };

  const handleSoundSettings = () => {
    toast.info("Sound & Vibration settings coming soon!");
  };

  return (
    <div className="min-h-screen bg-taskify-lightgrey pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <FadeIn direction="down">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBackNavigation}
              className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
              aria-label="Back to settings"
            >
              <ArrowLeft className="h-6 w-6 text-taskify-darkgrey font-bold" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold text-taskify-darkgrey">Notification Settings</h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          <FadeIn delay={100}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium text-taskify-darkgrey mb-2">Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Task Reminders</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Get reminded about upcoming tasks
                      </p>
                    </div>
                    <Switch 
                      checked={taskReminders}
                      onCheckedChange={setTaskReminders}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Deadline Alerts</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Receive alerts for approaching deadlines
                      </p>
                    </div>
                    <Switch 
                      checked={deadlineAlerts}
                      onCheckedChange={setDeadlineAlerts}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Sprint Updates</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Get notified about sprint progress and changes
                      </p>
                    </div>
                    <Switch 
                      checked={sprintUpdates}
                      onCheckedChange={setSprintUpdates}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-taskify-darkgrey">General Notifications</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Receive system announcements and updates
                      </p>
                    </div>
                    <Switch 
                      checked={generalNotifications}
                      onCheckedChange={setGeneralNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Card>
              <CardContent className="p-6">
                <button
                  onClick={handleSoundSettings}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                      <Volume2 className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Sound & Vibration</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Customize notification sounds and vibration
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-taskify-darkgrey/40" />
                </button>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={300}>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                      <Clock className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Notification Frequency</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        How often you want to receive notifications
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pl-14">
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly summary</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={400}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-taskify-blue/10">
                      <Bell className="h-5 w-5 text-taskify-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-taskify-darkgrey">Silent Mode</p>
                      <p className="text-sm text-taskify-darkgrey/60">
                        Temporarily mute all notifications
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={silentMode}
                    onCheckedChange={setSilentMode}
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>

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

export default NotificationSettings;
