import { apiClient } from "../config/axiosConfig";
import type { IChat } from "../interfaces/chat/IChat";
import type { IChatCreateResponse } from "../interfaces/chat/IChatCreateResponse";
import type { IChatTitleDto } from "../interfaces/chat/IChatTitleDto";

/**
 * ChatService
 *
 * Handles all API calls related to chat functionality.
 * Uses Axios for HTTP requests.
 *
 * @example
 * // Create new chat
 * const newChat = await ChatService.createChat("Hello!");
 *
 * // Get all chats
 * const chats = await ChatService.getAllChats();
 *
 * // Send message to existing chat
 * const updatedChat = await ChatService.sendMessage("1", "How are you?");
 */
export class ChatService {
  /**
   * Creates a new chat with the first message.
   *
   * @param message - The first message in the chat
   * @returns The newly created chat response with chatId and AI response
   */
  static async createChat(message: string): Promise<IChatCreateResponse> {
    try {
      const response = await apiClient.post<IChatCreateResponse>("/chat/new", {
        message,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        "Could not create chat. Check that the backend is running.",
      );
    }
  }

  /**
   * Fetches all chats with their messages.
   *
   * @returns Array of all chats
   */
  static async getAllChats(): Promise<IChat[]> {
    try {
      const response = await apiClient.get<IChat[]>("/chat/all");
      return response.data;
    } catch (error) {
      throw new Error(
        "Could not fetch chats. Check that the backend is running.",
      );
    }
  }

  /**
   * Fetches a single chat by ID.
   *
   * @param chatId - The ID of the chat
   * @returns The chat with all its messages
   */
  static async getChatById(chatId: string): Promise<IChat> {
    try {
      const response = await apiClient.get<IChat>(`/chat/chatId/${chatId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Could not fetch chat ${chatId}.`);
    }
  }

  /**
   * Sends a message to an existing chat.
   *
   * @param chatId - The ID of the chat
   * @param message - The message to send
   * @returns Chat response with chatId and AI response
   */
  static async sendMessage(
    chatId: string,
    message: string,
  ): Promise<IChatCreateResponse> {
    try {
      const response = await apiClient.post<IChatCreateResponse>(
        `/chat/chatId/${chatId}`,
        { message },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Could not send message to chat ${chatId}.`);
    }
  }

  /**
   * Updates the title of a chat.
   *
   * @param chatId - The ID of the chat
   * @param title - The new title
   * @returns Updated chat title DTO
   */
  static async updateChatTitle(
    chatId: string,
    title: string,
  ): Promise<IChatTitleDto> {
    try {
      const response = await apiClient.put<IChatTitleDto>(
        `/chat/edit/chatId/${chatId}`,
        title,
        { headers: { "Content-Type": "text/plain" } },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Could not update title for chat ${chatId}.`);
    }
  }

  /**
   * Edits a message and regenerates the conversation from that point.
   * All messages after the edited message will be erased.
   *
   * @param messageId - The ID of the message to edit
   * @param message - The new message content
   * @returns Chat response with chatId and new AI response
   */
  static async editMessage(
    messageId: string,
    message: string,
  ): Promise<IChatCreateResponse> {
    try {
      const response = await apiClient.put<IChatCreateResponse>(
        `/chat/edit/messageId/${messageId}`,
        { message },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Could not edit message ${messageId}.`);
    }
  }

  /**
   * Deletes a single chat and its messages.
   *
   * @param chatId - The ID of the chat to delete
   */
  static async deleteChat(chatId: string): Promise<void> {
    try {
      await apiClient.delete(`/chat/delete/chatId/${chatId}`);
    } catch (error) {
      throw new Error(`Could not delete chat ${chatId}.`);
    }
  }

  /**
   * Deletes all chats and their messages.
   */
  static async deleteAllChats(): Promise<void> {
    try {
      await apiClient.delete("/chat/delete/all");
    } catch (error) {
      throw new Error("Could not delete all chats.");
    }
  }

  /**
   * Deletes a single message.
   *
   * @param messageId - The ID of the message to delete
   */
  static async deleteMessage(messageId: string): Promise<void> {
    try {
      await apiClient.delete(`/chat/messageId/${messageId}`);
    } catch (error) {
      throw new Error(`Could not delete message ${messageId}.`);
    }
  }
}
