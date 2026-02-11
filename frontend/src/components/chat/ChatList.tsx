import { useTranslation } from "react-i18next";
import { useSidebar } from "../../contexts/SidebarContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

const ChatList = () => {
  const { isExtended, expandSidebar } = useSidebar();
  const { t } = useTranslation();

  if (!isExtended) {
    return (
      <button
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        onClick={expandSidebar}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="my-1.5 inline-block size-4 shrink-0" />
      </button>
    );
  } else {
    return (
      <>
        <label className="flex items-center gap-2 w-full">
          <ChatBubbleOvalLeftEllipsisIcon className="my-1.5 inline-block size-4 shrink-0" />
          <span className="is-drawer-close:hidden">{t("chat")}</span>
        </label>

        <ul>
          <li>
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right">
              <span className="is-drawer-close:hidden">{t("chat1")}</span>
            </button>
          </li>

          <li>
            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right">
              <span className="is-drawer-close:hidden">{t("chat2")}</span>
            </button>
          </li>
        </ul>
      </>
    );
  }
};

export default ChatList;
