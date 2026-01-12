import { db } from "../../config/database";
import { chats, messages } from "../../db/schema";
import { eq } from "drizzle-orm";
import { ChatRepository } from "./chat.repository";
import { Chat, ChatMessage } from "./chat.types";

export class PostgresChatRepository implements ChatRepository {

  async findById(chatId: number): Promise<Chat | null> {
    const result = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .limit(1);

    return result[0] ?? null;
  }

  async getAll(limit: number): Promise<Chat[]> {
    return await db
      .select({
        id: chats.id,
        title: chats.title,
      })
      .from(chats)
      .limit(limit);
  }

async getHistory(chatId: number, limit?: number): Promise<ChatMessage[]> {
  const query = db
    .select({
      id: messages.id,
      chatId: messages.chatId,
      content: messages.content,
    })
    .from(messages)
    .where(eq(messages.chatId, chatId));

  return limit !== undefined ? await query.limit(limit) : await query;
}

}
