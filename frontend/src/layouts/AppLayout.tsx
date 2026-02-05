import type { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import { useSidebarExtended } from "../hooks/useSidebarExtended";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  console.log("🎨 AppLayout rendres!", { children });
  const { isExtended, toggleSidebar } = useSidebarExtended();

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

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default AppLayout;
