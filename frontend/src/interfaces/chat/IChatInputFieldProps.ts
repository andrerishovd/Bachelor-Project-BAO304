export interface IChatInputFieldProps {
  chatId?: string;
  onSend?: (message: string, files: File[]) => void;
}
