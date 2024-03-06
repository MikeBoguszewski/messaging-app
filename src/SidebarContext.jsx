import { useState, useContext, createContext } from "react";

const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleVisibility = () => {
    setSidebarVisible((prevVisible) => !prevVisible);
  };

  return <SidebarContext.Provider value={{ sidebarVisible, toggleVisibility }}>{children}</SidebarContext.Provider>;
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
