import { useTranslation } from "react-i18next";
import ChangeLangBtn from "./ChangeLangBtn";
import ThemeControllerToggle from "./ThemeControllerToggle";

const Navbar = () => {
  const { t } = useTranslation(["common", "accessibility"]);

  return (
    <nav className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer-4"
        aria-label="accessibility:openSidebar"
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

      <div className="flex-1 px-4">Studdybudy</div>

      {/* UU settings for desktop screen sizes */}
      <div className="hidden  md:flex gap-2">
        <ChangeLangBtn />
        <ThemeControllerToggle />
      </div>

      {/* UU settings for mobile screen sizes */}
      <div className="dropdown dropdown-end md:hidden">
        <button
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          aria-label={t("accessibility:accessibilitySettings")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-200 rounded-box z-[1] mt-4 w-52 p-2 shadow-lg"
        >
          <li>
            <div className="flex items-center justify-between">
              <span>{t("accessibility:language")}</span>
              <ChangeLangBtn />
            </div>
          </li>
          <li>
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
