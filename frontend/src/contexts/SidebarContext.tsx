import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";


/* 
Context enabled for the sidebar becuase some "features" requires a updated state of what state the sidebar is in. 
By using a context the features in question is able to subscribe to what state the sidebar is in.

By saving the state to localstorage the website can "remember" the users preference between sessions.

Since Daisy UI elements for this feature uses "checkboxes" wee need to also update the checkbox to reflect the state


*/

interface SidebarContextType {
  isExtended: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isExtended, setIsExtended] = useState<boolean>(true);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-extended");
    const extended = savedState === null ? true : savedState === "true";
    setIsExtended(extended);
    updateDrawerState(extended);
  }, []);

  const updateDrawerState = (extended: boolean) => {
    document.documentElement.setAttribute(
      "data-sidebar-extended",
      String(extended),
    );

    const checkbox = document.getElementById("my-drawer-4") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = extended;
    }
  };

  const toggleSidebar = () => {
    const newState = !isExtended;
    setIsExtended(newState);
    localStorage.setItem("sidebar-extended", String(newState));
    updateDrawerState(newState);
  };

  const expandSidebar = () => {
    if (!isExtended) {
      setIsExtended(true);
      localStorage.setItem("sidebar-extended", "true");
      updateDrawerState(true);
    }
  };

  return (
    <SidebarContext.Provider
      value={{ isExtended, toggleSidebar, expandSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};
