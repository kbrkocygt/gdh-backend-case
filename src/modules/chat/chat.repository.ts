import { Chat, ChatMessage } from "./chat.types";

export interface ChatRepository {
  getAll(limit?: number): Promise<Chat[]>;
  getHistory(chatId: number, limit?: number): Promise<ChatMessage[]>;
  findById(chatId: number): Promise<Chat | null>;
}
