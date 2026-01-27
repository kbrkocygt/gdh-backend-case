import { Response } from "express";
import { ChatRepository } from "./chat.repository";
import { CompletionStrategyResolver } from "./strategies/completion-strategy.resolver";
import { AiToolStrategy } from "./strategies/ai-tool.strategy";
import { PaginationPolicy } from "./policies/pagination.policy";
import { ChatHistoryPolicy } from "./policies/chat-history.policy";
import { AppError } from "../../common/errors/app-error";

export class ChatService {
  constructor(
    
    private readonly chatRepository: ChatRepository,
    private readonly paginationPolicy: PaginationPolicy,
    private readonly chatHistoryPolicy: ChatHistoryPolicy,
    private readonly strategyResolver: CompletionStrategyResolver,
    private readonly aiToolStrategy: AiToolStrategy
  ) {}


async getChats() {
  const limit = this.paginationPolicy.resolveLimit();
    return this.chatRepository.getAll(limit);
}

async getChatHistory(chatId: number) {
  const chat = await this.chatRepository.findById(chatId);
  if (!chat) {
    throw new AppError(`Chat with id ${chatId} not found`, 404);
  }
  const limit = this.chatHistoryPolicy.resolveLimit();
  return this.chatRepository.getHistory(chatId, limit);
}

async completeChat(chatId: number, prompt: string, res: Response): Promise<void>
 {
    const chat = await this.chatRepository.findById(chatId);
    if (!chat) {
      throw new AppError(`Chat with id ${chatId} not found`, 404);
    }

    if (!prompt || !prompt.trim()) {
      throw new AppError("prompt is required", 400);
    }

    // Completion input comes from the user prompt; we can optionally include chat title as context.
    const basePrompt = `Chat: ${chat.title}\nUser: ${prompt.trim()}`;
    const enrichedPrompt = this.aiToolStrategy.enrich(basePrompt);

    const strategy = this.strategyResolver.resolve();
    await strategy.execute(res, enrichedPrompt);
  }
}
