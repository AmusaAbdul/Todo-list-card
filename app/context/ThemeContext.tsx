"use client"

import { createContext, useContext, useEffect, useState } from "react";


type TaskType = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  noText: string
};

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  filter: string;
  setFilter: (value: string) => void;
  filteredTask: TaskType[];
  task: string;
  setTask: (value: string) => void;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>; 
  category: string;
  setCategory: (value: string) => void;
  date: string
  setDate: (value: string) => void
  edit: string | null
  setEdit: (value: string | null ) => void
  note: string
  setNote: (value: string) => void
  notes: TaskType[]
  setNotes: React.Dispatch<React.SetStateAction<TaskType[]>>; 
 
};



const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("")
  const [edit, setEdit] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState<TaskType[]>([])


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setDarkMode(theme === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks", );
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])


  const filteredTask = filter === "All" ? tasks : tasks.filter((t: TaskType) => t.category === filter)
  return (
    <ThemeContext.Provider value={{edit, notes, setNote, note, setNotes, setEdit,  date, setDate, category, setCategory, darkMode, filter, setDarkMode, setFilter, filteredTask, task, setTask, tasks, setTasks }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};