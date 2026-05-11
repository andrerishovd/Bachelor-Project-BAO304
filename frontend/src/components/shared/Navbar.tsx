import { useTranslation } from "react-i18next";
import ChangeLangBtn from "./buttons/ChangeLangBtn";
import ThemeControllerToggle from "./ThemeControllerToggle";
import { useState } from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import {
  LayoutSidebarLeftCollapse,
  LayoutSidebarLeftExpand,
} from "tabler-icons-react";
import { useSidebar } from "../../contexts/SidebarContext";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useLocation, useParams } from "react-router-dom";
import { useChatContext } from "../../contexts/ChatContext";

const Navbar = () => {
  const { t } = useTranslation(["common", "accessibility"]);
  const { isExtended, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { chatId } = useParams();
  const { pathname } = useLocation();
  const { getChatById } = useChatContext();

  const getTitle = () => {
    if (chatId) {
      const chat = getChatById(chatId);
      return chat?.title ?? t("chat:chat");
    }
    if (pathname === "/") return t("common:homepage");
    if (pathname === "/chat/new") return t("chat:newChat");
    if (pathname === "/chats") return t("common:yourChats");
    if (pathname === "/search") return t("common:search");
    if (pathname === "/podcast/generate") return t("podcast:generatePodcast");
    if (pathname === "/podcast/library") return t("podcast:library");
    if (pathname === "/admin") return t("common:admin");

    return t("common:pageNotFound");
  };

  const { handleKeyDown } = useKeyboard({
    onEnter: () => setIsDropdownOpen(!isDropdownOpen),
    onEscape: () => setIsDropdownOpen(false),
  });

  return (
    <nav className="navbar w-full bg-base-300">
      <button
        onClick={toggleSidebar}
        aria-label={t("accessibility:toggleSidebar")}
        className="btn btn-square btn-ghost"
        aria-expanded={isExtended}
        aria-controls="my-drawer-4"
      >
        {isExtended ? (
          <LayoutSidebarLeftCollapse
            className="my-1.5 inline-block size-4 shrink-0"
            aria-hidden="true"
          />
        ) : (
          <LayoutSidebarLeftExpand
            className="my-1.5 inline-block size-4 shrink-0"
            aria-hidden="true"
          />
        )}
      </button>

      <div className="flex-1 px-4">
        <h1 className="text-base font-medium">{getTitle()}</h1>
      </div>

      {/* UU settings for desktop screen sizes */}
      <div className="hidden  md:flex gap-2">
        <ChangeLangBtn />
        <ThemeControllerToggle />
      </div>

      {/* UU settings for mobile screen sizes */}
      <div className="dropdown dropdown-end md:hidden">
        <button
          tabIndex={0}
          className="btn btn-ghost btn-square"
          aria-label={t("accessibility:accessibilitySettings")}
          aria-haspopup="true"
          onKeyDown={handleKeyDown}
          aria-expanded={isDropdownOpen}
        >
          <Cog6ToothIcon
            className="my-1.5 inline-block size-4 shrink-0"
            aria-hidden="true"
          />
        </button>

        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-4 w-52 p-2 shadow-lg"
          role="menu"
          aria-label={t("accessibility:accessibilitySettings")}
        >
          <li role="menuitem">
            <div className="flex items-center justify-between">
              <span>{t("accessibility:toggleLanguage")}</span>
              <ChangeLangBtn />
            </div>
          </li>
          <li role="menuitem">
            <div className="flex items-center justify-between">
              <span>{t("accessibility:theme")}</span>
              <ThemeControllerToggle />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
