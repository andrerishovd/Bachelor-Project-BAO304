import type { IChatMessage } from "./IChatMessage";

export interface IChat {
  id: string;
  title: string;
  userId: string;
  messageDtoList: IChatMessage[];
}
