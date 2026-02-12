import { useTranslation } from "react-i18next";
import { useSidebar } from "../../contexts/SidebarContext";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";

const mockChats = [
  { id: "1", title: "Hjelp med React" },
  { id: "2", title: "Canvas API spørsmål" },
  { id: "3", title: "TypeScript tips" },
];

const ChatList = () => {
  const { isExtended, expandSidebar } = useSidebar();
  const { t } = useTranslation("chat");
  const { chatId } = useParams();

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
          <span className="is-drawer-close:hidden">{t("chatListHeader")}</span>
        </label>

        <ul>
          {mockChats.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/chat/${chat.id}`}
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  chatId === chat.id ? "active" : ""
                }`}
              >
                <span className="is-drawer-close:hidden">{chat.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
};

export default ChatList;
