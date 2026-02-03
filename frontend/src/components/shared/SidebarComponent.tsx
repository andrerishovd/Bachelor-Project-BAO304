// https://daisyui.com/components/drawer/

import { useTranslation } from "react-i18next";
import ChangeLangBtn from "./ChangeLangBtn";
import SearchInputComponent from "./SearchInputComponent";
import ThemeControllerToggle from "./ThemeControllerToggle";
import { useSidebarExtended } from "../../hooks/useSidebarExtended";
import AvatarComponent from "./AvatarComponent";
import ChatInputField from "../chat/ChatInputField";
import ChatThreadContainer from "../chat/ChatThreadContainer";

const SidebarComponent = () => {
  const { t, i18n } = useTranslation("common");
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
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
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
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="flex-1 px-4">Navbar Title</div>
          <div className="flex gap-2">
            <ChangeLangBtn />
            <ThemeControllerToggle />
          </div>
        </nav>
        {/* Page content here */}
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4">
          <ChatThreadContainer />
          <div className="divider"></div>
          <ChatInputField />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button>
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <span className="is-drawer-close:hidden">
                  <SearchInputComponent />
                </span>
              </button>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={t("homepage")}
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
          </ul>
          <ul className="menu w-full">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={t("settings")}
              >
                {/* Settings icon */}
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
                <AvatarComponent />
                <span className="is-drawer-close:hidden">{t("Profile")}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
