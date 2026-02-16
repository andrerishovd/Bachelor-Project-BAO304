import { useState } from "react";
import { ChatService } from "../../services/ChatService";
import type { IChat } from "../../interfaces/chat/IChat";
import { AxiosError } from "axios";

const ChatApiTest = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateChat = async () => {
    setLoading(true);
    setError(null);
    try {
      const newChat = await ChatService.createChat(
        "Why are we still here just to suffer?",
      );
      console.log("✅ Chat created:", newChat);
      alert(`Chat created with ID: ${newChat.id}`);
      await handleGetAllChats();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`API Error: ${err.response?.status} - ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const allChats = await ChatService.getAllChats();
      setChats(allChats);
      console.log("✅ Fetched chats:", allChats);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`API Error: ${err.response?.status} - ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChatId || !newMessage.trim()) {
      alert("Velg en chat og skriv en melding!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const updatedChat = await ChatService.sendMessage(
        selectedChatId,
        newMessage,
      );
      console.log("✅ Message sent:", updatedChat);
      setNewMessage("");
      await handleGetAllChats();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(`API Error: ${err.response?.status} - ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat API Test</h1>

      {/* Error display */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Test buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handleCreateChat}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Loading..." : "Create New Chat"}
        </button>

        <button
          onClick={handleGetAllChats}
          disabled={loading}
          className="btn btn-secondary"
        >
          {loading ? "Loading..." : "Get All Chats"}
        </button>
      </div>

      {/* Chat list */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          All Chats ({chats.length})
        </h2>
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`card bg-base-200 p-4 cursor-pointer ${
                selectedChatId === chat.id ? "border-2 border-primary" : ""
              }`}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <h3 className="font-bold">Chat ID: {chat.id}</h3>
              <p className="text-sm opacity-70">Title: {chat.title}</p>
              <p className="text-sm opacity-70">
                Messages: {chat.messageDtoList.length}
              </p>

              {/* Display messages */}
              <div className="mt-2 space-y-1">
                {chat.messageDtoList.map((msg) => (
                  <div key={msg.id} className="text-xs">
                    <strong>{msg.senderType}:</strong> {msg.body}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Send message to selected chat */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Send Message</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input input-bordered flex-1"
            disabled={!selectedChatId}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !selectedChatId || !newMessage.trim()}
            className="btn btn-primary"
          >
            Send to Chat {selectedChatId}
          </button>
        </div>
        {!selectedChatId && (
          <p className="text-sm text-warning mt-2">
            Select a chat first by clicking on it
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatApiTest;
