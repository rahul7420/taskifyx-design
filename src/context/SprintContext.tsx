
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  tasks: string[];
}

export interface Retrospective {
  id: string;
  sprintId: string;
  wentWell: string;
  toImprove: string;
  createdAt: string;
}

interface SprintContextType {
  sprints: Sprint[];
  retrospectives: Retrospective[];
  addSprint: (sprint: Sprint) => void;
  updateSprint: (sprint: Sprint) => void;
  deleteSprint: (id: string) => void;
  addRetrospective: (retrospective: Retrospective) => void;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const useSprintContext = () => {
  const context = useContext(SprintContext);
  if (!context) {
    throw new Error("useSprintContext must be used within a SprintProvider");
  }
  return context;
};

export const SprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sprints, setSprints] = useState<Sprint[]>(() => {
    const savedSprints = localStorage.getItem("sprints");
    return savedSprints ? JSON.parse(savedSprints) : [
      {
        id: "1",
        name: "Sprint 1",
        goal: "Implement core features and set up basic infrastructure",
        startDate: new Date(Date.now() - 86400000 * 20).toISOString(), // 20 days ago
        endDate: new Date(Date.now() - 86400000 * 6).toISOString(), // 6 days ago
        tasks: ["1", "2"]
      },
      {
        id: "2",
        name: "Sprint 2",
        goal: "Add user authentication and dashboard features",
        startDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        endDate: new Date(Date.now() + 86400000 * 9).toISOString(), // 9 days from now
        tasks: ["3", "4"]
      }
    ];
  });
  
  const [retrospectives, setRetrospectives] = useState<Retrospective[]>(() => {
    const savedRetrospectives = localStorage.getItem("retrospectives");
    return savedRetrospectives ? JSON.parse(savedRetrospectives) : [
      {
        id: "1",
        sprintId: "1",
        wentWell: "Team collaboration was excellent. We implemented all planned features within the timeframe and quality was good.",
        toImprove: "We need to improve our estimation process. Some tasks took longer than expected. We should also enhance our testing process.",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("sprints", JSON.stringify(sprints));
  }, [sprints]);

  useEffect(() => {
    localStorage.setItem("retrospectives", JSON.stringify(retrospectives));
  }, [retrospectives]);

  const addSprint = (sprint: Sprint) => {
    setSprints((prevSprints) => [...prevSprints, sprint]);
  };

  const updateSprint = (updatedSprint: Sprint) => {
    setSprints((prevSprints) =>
      prevSprints.map((sprint) => (sprint.id === updatedSprint.id ? updatedSprint : sprint))
    );
  };

  const deleteSprint = (id: string) => {
    setSprints((prevSprints) => prevSprints.filter((sprint) => sprint.id !== id));
  };

  const addRetrospective = (retrospective: Retrospective) => {
    setRetrospectives((prevRetrospectives) => [...prevRetrospectives, retrospective]);
  };

  return (
    <SprintContext.Provider
      value={{
        sprints,
        retrospectives,
        addSprint,
        updateSprint,
        deleteSprint,
        addRetrospective,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
};
