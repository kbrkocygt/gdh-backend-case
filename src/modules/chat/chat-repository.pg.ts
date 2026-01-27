import { db } from "../../config/database";
import { chats, messages } from "../../db/schema";
import { desc, eq } from "drizzle-orm";
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
    .where(eq(messages.chatId, chatId))
    // No timestamp field in schema; id is monotonically increasing
    .orderBy(desc(messages.id));

  const rows = limit !== undefined ? await query.limit(limit) : await query;
  // For "last 10" we usually want chronological order (old -> new)
  return rows.reverse();
}

}
