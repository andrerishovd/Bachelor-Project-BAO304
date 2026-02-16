// https://daisyui.com/components/drawer/

import { useTranslation } from "react-i18next";
import UserAvatar from "./UserAvatar";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import { useRef, useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatList from "../chat/ChatList";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import GeneratePodcastCard from "../podcast/GeneratePodcastCard";
import CreateChatButton from "../chat/CreateChatButton";

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

              <HomeIcon className="my-1.5 inline-block size-4 shrink-0" />
              <span className="is-drawer-close:hidden">{t("homepage")}</span>
            </button>
          </li>

          <li>
            <CreateChatButton />
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
              <AdjustmentsHorizontalIcon className="my-1.5 inline-block size-4 shrink-0" />
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
