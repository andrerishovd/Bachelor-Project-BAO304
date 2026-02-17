// src/services/chatService.ts
import { apiClient } from "../config/axiosConfig";
import type { IChat } from "../interfaces/chat/IChat";
import type { IChatCreateResponse } from "../interfaces/chat/IChatCreateResponse";

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
   * Creates a new chat with the first message
   *
   * @param message - The first message in the chat
   * @returns The newly created chat with a generated ID
   * @throws Error if API call fails
   */

  /* TODO fix this - more could be done in backend. */
  static async createChat(message: string): Promise<IChatCreateResponse> {
    try {
      const response = await apiClient.post<IChatCreateResponse>("/chat/new", {
        message,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw new Error(
        "Could not create chat. Check that the backend is running.",
      );
    }
  }

  /**
   * Fetches all chats for the user
   *
   * @returns Array of all chats
   * @throws Error if API call fails
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
   * Sends a message to an existing chat
   *
   * @param chatId - The ID of the chat
   * @param message - The message to be sent
   * @returns Updated chat with the new message
   * @throws Error if API call fails
   */
  static async sendMessage(chatId: string, message: string): Promise<IChat> {
    try {
      const response = await apiClient.post<IChat>(`/chat/chatId/${chatId}`, {
        message,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Could not send message to chat ${chatId}.`);
    }
  }

  /**
   * Fetches a specific chat based on ID
   *
   * @param chatId - The ID of the chat
   * @returns The chat with all messages
   * @throws Error if chat is not found
   */
  static async getChatById(chatId: string): Promise<IChat> {
    const chats = await this.getAllChats();
    const chat = chats.find((c) => c.id === chatId);

    if (!chat) {
      throw new Error(`Chat with ID ${chatId} was not found.`);
    }

    return chat;
  }

  /**
   * Deletes a chat (if backend supports it)
   *
   * @param chatId - The ID of the chat to delete
   * @throws Error if API call fails
   */
  static async deleteChat(chatId: string): Promise<void> {
    try {
      await apiClient.delete(`/chat/${chatId}`);
    } catch (error) {
      throw new Error(`Could not delete chat ${chatId}.`);
    }
  }
}
