
import React, { useState } from "react";
import { PlusCircle, Calendar, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useTaskContext } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Transition from "@/components/animations/Transition";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useSprintContext } from "@/context/SprintContext";

const SprintManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { sprints, addSprint } = useSprintContext();
  const { tasks } = useTaskContext();
  
  const form = useForm({
    defaultValues: {
      name: "",
      goal: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(new Date().setDate(new Date().getDate() + 14)), "yyyy-MM-dd"),
    },
  });

  const onSubmit = (data: any) => {
    addSprint({
      id: Date.now().toString(),
      name: data.name,
      goal: data.goal,
      startDate: data.startDate,
      endDate: data.endDate,
      tasks: []
    });
    toast.success("Sprint created successfully!");
    setOpen(false);
    form.reset();
  };

  const calculateProgress = (sprintId: string) => {
    const sprintTasks = tasks.filter(task => task.sprintId === sprintId);
    const completedTasks = sprintTasks.filter(task => task.status === "completed");
    return sprintTasks.length > 0 ? (completedTasks.length / sprintTasks.length) * 100 : 0;
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Transition className="container py-8 pb-24 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sprint Management</h1>
          <p className="text-muted-foreground mt-1">Manage and track your sprints</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-taskify-blue to-taskify-violet hover:opacity-90 transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4" /> New Sprint
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Create New Sprint</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sprint Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sprint 1" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sprint Goal</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What are we trying to achieve in this sprint?" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Create Sprint</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprints.map((sprint) => {
          const taskCount = tasks.filter(task => task.sprintId === sprint.id).length;
          const progress = calculateProgress(sprint.id);
          const duration = calculateDuration(sprint.startDate, sprint.endDate);
          
          return (
            <Card key={sprint.id} className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-taskify-blue to-taskify-violet text-white p-4">
                  <h3 className="text-lg font-semibold">{sprint.name}</h3>
                  <p className="text-sm opacity-90 truncate">{sprint.goal}</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{duration} days</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      <span>{taskCount} tasks</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs mt-3">
                    <div>
                      <span className="text-muted-foreground">Start: </span>
                      <span>{format(new Date(sprint.startDate), "MMM d, yyyy")}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">End: </span>
                      <span>{format(new Date(sprint.endDate), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => toast.info(`Viewing tasks for ${sprint.name}`)}
                  >
                    View Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sprints.length === 0 && (
        <div className="text-center p-12 rounded-xl bg-muted/50 mt-8">
          <h3 className="text-xl font-medium mb-2">No Sprints Yet</h3>
          <p className="text-muted-foreground mb-6">Create your first sprint to start managing tasks efficiently.</p>
          <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Sprint
          </Button>
        </div>
      )}
      
      {/* Mobile floating action button */}
      <div className="md:hidden fixed bottom-20 right-4 z-10">
        <Button 
          onClick={() => setOpen(true)} 
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-taskify-blue to-taskify-violet hover:opacity-90 transition-all duration-300"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>
    </Transition>
  );
};

export default SprintManagement;
