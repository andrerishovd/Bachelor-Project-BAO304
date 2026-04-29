// https://daisyui.com/components/drawer/

import { useTranslation } from "react-i18next";
import UserAvatar from "./UserAvatar";
import SearchField from "./SearchField";
import { useNavigate } from "react-router-dom";
import SettingsModal from "../settings/SettingsModal";
import { useRef, useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import ChatList from "../chat/sidebar/ChatList";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import GeneratePodcastCard from "../podcast/GeneratePodcastCard";
import CreateChatButton from "./buttons/CreateChatButton";
import ProfileModal from "../profile/ProfileModal";
import ChatListButton from "../chat/sidebar/ChatListButton";
import AppLogo from "./AppLogoSm";
import GeneratePodcastButton from "./buttons/GeneratePodcastButton";
import MiniPlayer from "../podcast/mediaplayer/MiniPlayer";
import { useMediaContext } from "../../contexts/MediaContext";
import PodcastLibraryButton from "./buttons/PodcastLibraryButton";
import AppLogoSm from "./AppLogoSm";
import HomeButton from "./buttons/HomeButton";

const Sidebar = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  /* const { isExtended, expandSidebar } = useSidebar(); */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isExpanded } = useMediaContext();

  const handleLogoClick = () => {
    navigate("/index");
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  return (
    <>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Top items */}
        <ul className="menu w-full ">
          {/* TODO Should this even be here, could be above and text only */}
          <AppLogoSm />

          {/* Search */}

          <SearchField />

          <li>
            <HomeButton />
          </li>
          <li>
            <GeneratePodcastButton />
          </li>
          <li>
            <PodcastLibraryButton />
          </li>
          <li>
            <CreateChatButton />
          </li>
          <li>
            <ChatListButton />
          </li>
        </ul>

        <div className="w-full grow overflow-y-auto flex flex-col justify-start">
          <ChatList />
        </div>

        {!isExpanded && (
          <div className="w-full px-2 pb-2">
            <MiniPlayer />
          </div>
        )}

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

          {/*  <li>
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip={t("profile")}
              onClick={handleProfileClick}
            >
              <UserAvatar />
              <span className="is-drawer-close:hidden">{t("Profile")}</span>
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
