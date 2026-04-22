/**
 * ChatListSkeleton
 *
 * Displayed in the sidebar while fetching the list of chats.
 * Mimics the narrow text rows of actual chat titles.
 *
 * @example
 * {loading ? <ChatListSkeleton /> : <ChatList />}
 *
 *
 * the widths are varied to look more natural
 */
const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`skeleton h-3 rounded-sm ${
            i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-4/5" : "w-3/5"
          }`}
        />
      ))}
    </div>
  );
};

export default ChatListSkeleton;
