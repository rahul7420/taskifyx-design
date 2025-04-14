import React, { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import { useTaskContext } from "@/context/TaskContext";
import { Calendar, List, CheckCheck, Clock } from "lucide-react";
import Transition from "@/components/animations/Transition";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileOverviewPopup from "@/components/profile/ProfileOverviewPopup";

interface UserData {
  name: string;
  email: string;
  profilePicture: string;
}

const Dashboard = () => {
  const { getTasksByStatus, getUpcomingTasks } = useTaskContext();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  
  const todoTasks = getTasksByStatus("todo");
  const inProgressTasks = getTasksByStatus("inprogress");
  const completedTasks = getTasksByStatus("completed");
  const upcomingTasks = getUpcomingTasks(7); // Tasks due in the next 7 days
  
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleProfileClick = () => {
    navigate("/profile-settings");
  };

  return (
    <Transition className="min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <header className="mb-8 flex items-center justify-between">
          <FadeIn direction="down">
            <div>
              <h2 className="text-xl font-bold text-taskify-darkgrey">Dashboard</h2>
              <p className="text-sm text-taskify-darkgrey/60">{getCurrentDate()}</p>
            </div>
          </FadeIn>
          
          <FadeIn direction="down">
            <button 
              className="flex items-center gap-2"
              onClick={handleProfileClick}
            >
              {user?.name && (
                <span className="text-sm font-medium text-taskify-darkgrey hidden sm:inline-block">
                  {user.name.split(' ')[0]}
                </span>
              )}
              <Avatar className="h-10 w-10 cursor-pointer border border-white shadow-sm">
                <AvatarImage src={user?.profilePicture || "https://ui-avatars.com/api/?name=User&background=random"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </button>
          </FadeIn>
        </header>

        <section className="mb-8">
          <FadeIn direction="left">
            <h3 className="mb-4 text-lg font-medium text-taskify-darkgrey">Task Overview</h3>
          </FadeIn>
          
          <div className="grid grid-cols-2 gap-4">
            <Card variant="todo" delay={100}>
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-taskify-blue/20">
                  <List className="h-5 w-5 text-taskify-blue" />
                </div>
                <h4 className="text-lg font-bold text-taskify-darkgrey">{todoTasks.length}</h4>
                <p className="text-sm text-taskify-darkgrey/70">To-Do</p>
              </div>
            </Card>
            
            <Card variant="inprogress" delay={200}>
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-400/20">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <h4 className="text-lg font-bold text-taskify-darkgrey">{inProgressTasks.length}</h4>
                <p className="text-sm text-taskify-darkgrey/70">In Progress</p>
              </div>
            </Card>
            
            <Card variant="completed" delay={300}>
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-400/20">
                  <CheckCheck className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="text-lg font-bold text-taskify-darkgrey">{completedTasks.length}</h4>
                <p className="text-sm text-taskify-darkgrey/70">Completed</p>
              </div>
            </Card>
            
            <Card variant="upcoming" delay={400}>
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-400/20">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <h4 className="text-lg font-bold text-taskify-darkgrey">{upcomingTasks.length}</h4>
                <p className="text-sm text-taskify-darkgrey/70">Upcoming</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <FadeIn direction="left">
            <h3 className="mb-4 text-lg font-medium text-taskify-darkgrey">Upcoming Tasks</h3>
          </FadeIn>
          
          {upcomingTasks.length > 0 ? (
            <div className="space-y-3">
              {upcomingTasks.slice(0, 3).map((task, index) => (
                <FadeIn key={task.id} delay={100 * index} direction="right">
                  <Card
                    className="flex items-center p-3"
                    onClick={() => navigate("/tasks")}
                  >
                    <div className={`mr-3 h-10 w-10 flex-shrink-0 rounded-full ${
                      task.priority === "high" 
                        ? "bg-red-500/10" 
                        : task.priority === "medium" 
                        ? "bg-orange-500/10" 
                        : "bg-green-500/10"
                    }`}>
                      <div className="flex h-full w-full items-center justify-center">
                        <div className={`h-3 w-3 rounded-full ${
                          task.priority === "high" 
                            ? "bg-red-500" 
                            : task.priority === "medium" 
                            ? "bg-orange-500" 
                            : "bg-green-500"
                        }`}></div>
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-taskify-darkgrey">{task.title}</h4>
                      <p className="text-xs text-taskify-darkgrey/60">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`ml-2 h-2 w-2 rounded-full ${
                      task.status === "todo" 
                        ? "bg-taskify-blue" 
                        : task.status === "inprogress" 
                        ? "bg-orange-500" 
                        : "bg-green-500"
                    }`}></div>
                  </Card>
                </FadeIn>
              ))}
              
              {upcomingTasks.length > 3 && (
                <FadeIn delay={400} direction="up">
                  <p className="mt-2 text-center text-sm text-taskify-darkgrey/60">
                    +{upcomingTasks.length - 3} more upcoming tasks
                  </p>
                </FadeIn>
              )}
            </div>
          ) : (
            <FadeIn>
              <Card className="p-4 text-center">
                <p className="text-taskify-darkgrey/70">No upcoming tasks</p>
              </Card>
            </FadeIn>
          )}
        </section>

        <FadeIn direction="up" delay={200}>
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/add-task")}
          >
            Add New Task
          </Button>
        </FadeIn>
      </div>
      
      <ProfileOverviewPopup 
        open={showProfilePopup} 
        onOpenChange={setShowProfilePopup} 
      />
    </Transition>
  );
};

export default Dashboard;
