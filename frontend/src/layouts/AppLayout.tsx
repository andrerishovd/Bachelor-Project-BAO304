import type { ReactNode } from "react";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";

import { useSidebar } from "../contexts/SidebarContext";
import type { AppLayoutProps } from "../interfaces/shared/IAppLayoutProps";
import { useMediaContext } from "../contexts/MediaContext";
import FullPlayer from "../components/podcast/mediaplayer/FullPlayer";

// App layout acts as the viewport, showing page content between the frame of the Navbar and Sidebar.
// Pages from pages/ are rendered inside the children prop.

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isExtended, toggleSidebar } = useSidebar();
  const { episode, isExpanded } = useMediaContext();
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isExtended}
        onChange={toggleSidebar}
      />

      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
        {episode && <FullPlayer />}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default AppLayout;
