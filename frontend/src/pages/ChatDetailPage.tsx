import { useParams } from "react-router-dom";
import ChatInputField from "../components/chat/ChatInputField";
import ChatThreadContainer from "../components/chat/ChatThreadContainer";
/* import { ChatProvider } from "../contexts/ChatContext"; */

const ChatDetailPage = () => {
  const { chatId } = useParams<{ chatId: string }>();

  console.log("ChatDetailPage rendered");
  return (
    <>
      <div className="flex flex-col h-full items-center">
        <div className="flex flex-col h-full w-full max-w-4xl">
          {/* Chat header */}
          <div className="border-b border-base-300 p-4">
            <h1 className="text-2xl font-bold">Chat {chatId}</h1>
          </div>

          {/* Chat thread */}
          <ChatThreadContainer chatId={chatId} />

          {/* Input field */}
          <div className="border-t border-base-300 p-4">
            <ChatInputField chatId={chatId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDetailPage;
