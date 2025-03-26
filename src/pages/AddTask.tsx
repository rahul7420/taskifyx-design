
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "@/context/TaskContext";
import Button from "@/components/common/Button";
import Transition from "@/components/animations/Transition";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addTask({
        title,
        description,
        dueDate: dueDate.toISOString(),
        priority,
        status: "todo",
      });

      toast.success("Task added successfully");
      setIsSubmitting(false);
      navigate("/tasks");
    }, 500);
  };

  return (
    <Transition className="min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <header className="mb-6">
          <FadeIn direction="down">
            <h2 className="text-xl font-bold text-taskify-darkgrey">Add New Task</h2>
            <p className="text-sm text-taskify-darkgrey/60">
              Create a new task to track
            </p>
          </FadeIn>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FadeIn direction="up" delay={100}>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-taskify-darkgrey"
              >
                Task Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="w-full rounded-lg border border-taskify-grey/30 bg-white p-3 text-taskify-darkgrey outline-none focus:border-taskify-blue focus:ring-2 focus:ring-taskify-blue/20"
                required
              />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-taskify-darkgrey"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
                className="w-full rounded-lg border border-taskify-grey/30 bg-white p-3 text-taskify-darkgrey outline-none focus:border-taskify-blue focus:ring-2 focus:ring-taskify-blue/20"
              />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-taskify-darkgrey">
                Due Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border border-taskify-grey/30 bg-white p-3 text-left text-taskify-darkgrey outline-none focus:border-taskify-blue focus:ring-2 focus:ring-taskify-blue/20",
                      !dueDate && "text-taskify-darkgrey/60"
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : "Select a date"}
                    <CalendarIcon className="h-4 w-4 text-taskify-darkgrey/60" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-taskify-darkgrey">
                Priority
              </label>
              <div className="flex rounded-lg border border-taskify-grey/30 bg-white p-1">
                <button
                  type="button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm transition-colors ${
                    priority === "low"
                      ? "bg-green-500 text-white"
                      : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
                  }`}
                  onClick={() => setPriority("low")}
                >
                  {priority === "low" && <Check className="h-3 w-3" />}
                  Low
                </button>
                <button
                  type="button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm transition-colors ${
                    priority === "medium"
                      ? "bg-orange-500 text-white"
                      : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
                  }`}
                  onClick={() => setPriority("medium")}
                >
                  {priority === "medium" && <Check className="h-3 w-3" />}
                  Medium
                </button>
                <button
                  type="button"
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm transition-colors ${
                    priority === "high"
                      ? "bg-red-500 text-white"
                      : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
                  }`}
                  onClick={() => setPriority("high")}
                >
                  {priority === "high" && <Check className="h-3 w-3" />}
                  High
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={500}>
            <div className="flex flex-col gap-3 pt-4">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                Add Task
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </FadeIn>
        </form>
      </div>
    </Transition>
  );
};

export default AddTask;
