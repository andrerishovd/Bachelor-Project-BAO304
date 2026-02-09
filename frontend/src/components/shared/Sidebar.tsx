// https://daisyui.com/components/drawer/

import { useTranslation } from "react-i18next";
import UserAvatar from "./UserAvatar";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import { useRef, useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatList from "../chat/ChatList";

const Sidebar = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  /* const { isExtended, expandSidebar } = useSidebar(); */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  return (
    <>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Top items */}
        <ul className="menu w-full grow">
          {/* Search */}

          <li>
            <SearchField />
          </li>

          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip={t("homepage")}
              onClick={handleHomeClick}
            >
              {/* Home icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              <span className="is-drawer-close:hidden">{t("homepage")}</span>
            </button>
          </li>

          <li>
            <ChatList />
          </li>
        </ul>

        {/* Bottom items */}
        <ul className="menu w-full">
          <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip={t("settings")}
              onClick={handleSettingsClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
              <span className="is-drawer-close:hidden">{t("settings")}</span>
            </button>
          </li>

          <li>
            <button>
              <UserAvatar />
              <span className="is-drawer-close:hidden">{t("Profile")}</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
