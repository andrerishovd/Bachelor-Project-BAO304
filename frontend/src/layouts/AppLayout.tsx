import type { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import { useSidebar } from "../contexts/SidebarContext";

interface AppLayoutProps {
  children: ReactNode;
}

// App layout acts as the viewport, showing page content between the frame of the Navbar and Sidebar.

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isExtended, toggleSidebar } = useSidebar();

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isExtended}
        onChange={toggleSidebar}
      />

      <div className="drawer-content">
        <Navbar />
        <main className="flex flex-col h-[calc(100vh-4rem)] p-4">
          {children}
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default AppLayout;
