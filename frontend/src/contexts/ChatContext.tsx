import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type FC,
  type ReactNode,
} from "react";
import { ChatService } from "../services/ChatService";
import type { IChat } from "../interfaces/chat/IChat";

/**
 * IChatContext
 *
 * Defines the shape of the ChatContext.
 * Provides chat state and actions to all child components.
 *
 * @property chats - Array of all chats fetched from ChatService.getAllChats()
 * @property loading - True while fetching chats from backend
 * @property error - Error message if fetching failed, null otherwise
 * @property refetch - Manually re-fetches all chats from backend
 */
interface IChatContext {
  chats: IChat[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getChatById: (chatId: string) => IChat | undefined;
}

interface IProps {
  children: ReactNode;
}

/**
 * ChatContext
 *
 * Provides global chat state to the component tree.
 * Fetches chats via ChatService and exposes them to child components,
 * avoiding prop drilling and duplicate API calls.
 *
 * @usage Wrap your component tree with ChatProvider (see App.tsx)
 * @see ChatService for API calls
 * @see useChatContext for consuming the context
 */
export const ChatContext = createContext<IChatContext | null>(null);

/**
 * ChatProvider
 *
 * Fetches all chats on mount via ChatService.getAllChats()
 * and provides them to the component tree via ChatContext.
 *
 * @param children - Child components that need access to chat state
 *
 * @example
 * // App.tsx
 * <ChatProvider>
 *   <AppRouting />
 * </ChatProvider>
 *
 * // Any child component:
 * const { chats, loading, refetch } = useChatContext();
 */
export const ChatProvider: FC<IProps> = ({ children }) => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetches all chats from backend via ChatService.getAllChats()
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const allChats = await ChatService.getAllChats();

      // Sorts from newest to oldest based on last message.
      const sorted = allChats.sort((a, b) => {
        const aLastMessage = a.messageDtoList[a.messageDtoList.length - 1];
        const bLastMessage = b.messageDtoList[b.messageDtoList.length - 1];

        if (!aLastMessage || !bLastMessage) return 0;

        return (
          new Date(bLastMessage.localDateTime).getTime() -
          new Date(aLastMessage.localDateTime).getTime()
        );
      });

      setChats(sorted);
      setError(null);
    } catch (err) {
      setError("Could not load chats");
    } finally {
      setLoading(false);
    }
  }, []);

  const getChatById = useCallback(
    (chatId: string): IChat | undefined => {
      return chats.find((c) => c.id === chatId);
    },
    [chats],
  );

  // Fetch chats on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ChatContext.Provider
      value={{ chats, loading, error, refetch, getChatById }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/**
 * useChatContext
 *
 * Custom hook for consuming ChatContext.
 * Must be used within a ChatProvider.
 *
 * @returns ChatContext value: { chats, loading, error, refetch }
 * @throws Error if used outside of ChatProvider
 *
 * @example
 * const { chats, loading, refetch } = useChatContext();
 */
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within ChatProvider");
  return context;
};
