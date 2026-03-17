import { useTranslation } from "react-i18next";
import ChangeLangBtn from "./ChangeLangBtn";
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
      return chat?.title ?? t("common.chat");
    }
    if (pathname === "/chats") return t("common:yourChats");
    if (pathname === "/admin") return t("common:admin");
    if (pathname === "/chat/new") return t("chat:newChat");
    if (pathname === "/") return t("common:homepage");

    return t("common:pageNotFound");
  };

  const { handleKeyDown } = useKeyboard({
    onEnter: () => setIsDropdownOpen(!isDropdownOpen),
    onEscape: () => setIsDropdownOpen(false),
  });

  return (
    <nav className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer-4"
        aria-label={t("accessibility:toggleSidebar")}
        className="btn btn-square btn-ghost"
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
      </label>

      <div className="flex-1 px-4">{getTitle()}</div>

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
          <Cog6ToothIcon className="my-1.5 inline-block size-4 shrink-0" />
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
