// TODO This has to reflect the messages in backend.
export interface IChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  attachments?: File[];
}
