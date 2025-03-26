
import React, { useState } from "react";
import { useTaskContext, Task } from "@/context/TaskContext";
import Card from "@/components/common/Card";
import { Check, Clock, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";
import Transition from "@/components/animations/Transition";
import FadeIn from "@/components/animations/FadeIn";

type TabType = "all" | "todo" | "inprogress" | "completed";

const Tasks = () => {
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredTasks = activeTab === "all" 
    ? tasks 
    : tasks.filter(task => task.status === activeTab);

  const handleStatusChange = (task: Task, newStatus: Task["status"]) => {
    updateTask({
      ...task,
      status: newStatus,
    });
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return "text-taskify-blue";
      case "inprogress":
        return "text-orange-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "todo":
        return <Clock className="h-4 w-4" />;
      case "inprogress":
        return <Edit className="h-4 w-4" />;
      case "completed":
        return <Check className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Transition className="min-h-screen pb-20 pt-8">
      <div className="mx-auto max-w-md px-4">
        <header className="mb-6">
          <FadeIn direction="down">
            <h2 className="text-xl font-bold text-taskify-darkgrey">Tasks</h2>
            <p className="text-sm text-taskify-darkgrey/60">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
            </p>
          </FadeIn>
        </header>

        <FadeIn direction="up" delay={100}>
          <div className="mb-6 flex rounded-lg bg-white p-1">
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "all" ? "bg-taskify-blue text-white" : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "todo" ? "bg-taskify-blue text-white" : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
              }`}
              onClick={() => setActiveTab("todo")}
            >
              To-Do
            </button>
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "inprogress" ? "bg-taskify-blue text-white" : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
              }`}
              onClick={() => setActiveTab("inprogress")}
            >
              In Progress
            </button>
            <button
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "completed" ? "bg-taskify-blue text-white" : "text-taskify-darkgrey/70 hover:bg-taskify-lightgrey/50"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Done
            </button>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <FadeIn key={task.id} delay={100 * index} direction="up">
                <Card className="overflow-visible">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-3 h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <h3 className="font-medium text-taskify-darkgrey">{task.title}</h3>
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${getStatusColor(task.status)} bg-opacity-10`}>
                      {getStatusIcon(task.status)}
                      <span>
                        {task.status === "todo" ? "To-Do" : task.status === "inprogress" ? "In Progress" : "Completed"}
                      </span>
                    </div>
                  </div>

                  <p className="mb-3 text-sm text-taskify-darkgrey/70">{task.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-taskify-darkgrey/60">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      {task.status !== "completed" && (
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10 text-green-500 transition-colors hover:bg-green-500/20"
                          onClick={() => handleStatusChange(task, "completed")}
                          title="Mark as completed"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}

                      {task.status !== "inprogress" && task.status !== "completed" && (
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 transition-colors hover:bg-orange-500/20"
                          onClick={() => handleStatusChange(task, "inprogress")}
                          title="Mark as in progress"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}

                      {task.status === "completed" && (
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-taskify-blue/10 text-taskify-blue transition-colors hover:bg-taskify-blue/20"
                          onClick={() => handleStatusChange(task, "todo")}
                          title="Mark as to-do"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))
          ) : (
            <FadeIn delay={100}>
              <div className="mt-10 flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-taskify-blue/10">
                  <Clock className="h-8 w-8 text-taskify-blue" />
                </div>
                <h3 className="text-lg font-medium text-taskify-darkgrey">No tasks found</h3>
                <p className="mt-1 text-center text-sm text-taskify-darkgrey/60">
                  {activeTab === "all"
                    ? "You don't have any tasks yet."
                    : activeTab === "todo"
                    ? "You don't have any to-do tasks."
                    : activeTab === "inprogress"
                    ? "You don't have any in-progress tasks."
                    : "You don't have any completed tasks."}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default Tasks;
