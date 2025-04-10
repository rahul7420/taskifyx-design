
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "inprogress" | "completed";
  sprintId?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: Task["status"]) => Task[];
  getUpcomingTasks: (days: number) => Task[];
  getTasksBySprint: (sprintId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: "1",
        title: "Design TaskifyX UI",
        description: "Create a modern UI design for the TaskifyX app",
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        priority: "high",
        status: "todo",
        sprintId: "2"
      },
      {
        id: "2",
        title: "Implement Dashboard",
        description: "Code the dashboard component with task statistics",
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
        priority: "medium",
        status: "todo",
        sprintId: "2"
      },
      {
        id: "3",
        title: "Create Login Page",
        description: "Design and implement the login page with Google authentication",
        dueDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        priority: "medium",
        status: "inprogress",
        sprintId: "2"
      },
      {
        id: "4",
        title: "Setup API Routes",
        description: "Configure API routes for task management",
        dueDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        priority: "low",
        status: "completed",
        sprintId: "1"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const getUpcomingTasks = (days: number) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + days);

    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= currentDate && taskDate <= futureDate && task.status !== "completed";
    });
  };
  
  const getTasksBySprint = (sprintId: string) => {
    return tasks.filter(task => task.sprintId === sprintId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTasksByStatus,
        getUpcomingTasks,
        getTasksBySprint
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
