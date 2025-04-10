
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTaskContext } from "@/context/TaskContext";
import { useSprintContext } from "@/context/SprintContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import Transition from "@/components/animations/Transition";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  priority: z.enum(["high", "medium", "low"]),
  sprintId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddTask: React.FC = () => {
  const { addTask } = useTaskContext();
  const { sprints } = useSprintContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get sprint ID from URL query params if it exists
  const queryParams = new URLSearchParams(location.search);
  const sprintIdParam = queryParams.get("sprint");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium",
      sprintId: sprintIdParam || "",
    },
  });

  // Set the default sprint if provided in URL
  useEffect(() => {
    if (sprintIdParam) {
      form.setValue("sprintId", sprintIdParam);
    }
  }, [sprintIdParam, form]);

  const onSubmit = (data: FormValues) => {
    addTask({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      priority: data.priority,
      status: "todo",
      sprintId: data.sprintId || undefined,
    });
    
    toast.success("Task created successfully!");
    
    // Navigate back to the tasks page with sprint filter if applicable
    if (data.sprintId) {
      const sprint = sprints.find(s => s.id === data.sprintId);
      navigate(`/tasks?sprint=${data.sprintId}${sprint ? `&name=${encodeURIComponent(sprint.name)}` : ''}`);
    } else {
      navigate("/tasks");
    }
  };

  const goBack = () => {
    if (sprintIdParam) {
      const sprint = sprints.find(s => s.id === sprintIdParam);
      navigate(`/tasks?sprint=${sprintIdParam}${sprint ? `&name=${encodeURIComponent(sprint.name)}` : ''}`);
    } else {
      navigate("/tasks");
    }
  };

  return (
    <Transition className="container max-w-md py-8 px-4">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50 hover:text-taskify-darkgrey group"
        onClick={goBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Tasks
      </Button>
      
      <h2 className="text-2xl font-bold mb-6 text-taskify-darkgrey">Add New Task</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-taskify-darkgrey">Task title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter task title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-taskify-darkgrey">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter task description"
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-taskify-darkgrey">Due date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-taskify-darkgrey">Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sprintId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-taskify-darkgrey">Sprint (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to a sprint (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sprints</SelectLabel>
                      <SelectItem value="">None</SelectItem>
                      {sprints.map((sprint) => (
                        <SelectItem key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-taskify-blue hover:bg-taskify-blue/90"
          >
            Create Task
          </Button>
        </form>
      </Form>
    </Transition>
  );
};

export default AddTask;
