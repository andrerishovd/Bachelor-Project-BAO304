export interface IChatInputFieldProps {
  chatId?: string;
  onSend?: (message: string, files: File[]) => void;
  isNewChat?: boolean;
  onMessageSent?: () => Promise<void>;
}
