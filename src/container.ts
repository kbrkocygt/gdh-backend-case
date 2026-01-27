import { ChatService } from "./modules/chat/chat.service";
import { PostgresChatRepository } from "./modules/chat/chat-repository.pg";

import { JsonCompletionStrategy } from "./modules/chat/strategies/json-completion.strategy";
import { StreamingCompletionStrategy } from "./modules/chat/strategies/streaming-completion.strategy";

import { MockAiToolStrategy } from "./modules/chat/strategies/mock-ai-tool.strategy";
import { CompletionStrategyResolver } from "./modules/chat/strategies/completion-strategy.resolver";

import { FEATURE_FLAGS } from "./config/feature-flags";
import { PaginationPolicy } from "./modules/chat/policies/pagination.policy";
import { ChatHistoryPolicy } from "./modules/chat/policies/chat-history.policy"; // ✅ path sende farklı olabilir

// Repository
const chatRepository = new PostgresChatRepository();

// Strategies
const jsonStrategy = new JsonCompletionStrategy();
const streamingStrategy = new StreamingCompletionStrategy();

// Policies
const paginationPolicy = new PaginationPolicy(FEATURE_FLAGS);
const chatHistoryPolicy = new ChatHistoryPolicy(FEATURE_FLAGS);

// Resolver
const completionStrategyResolver = new CompletionStrategyResolver(
  FEATURE_FLAGS,
  jsonStrategy,
  streamingStrategy
);

// AI Tool Strategy
const aiToolStrategy = new MockAiToolStrategy(); // veya NullAiToolStrategy

// Service
const chatService = new ChatService(
  chatRepository,
  paginationPolicy,
  chatHistoryPolicy,
  completionStrategyResolver,
  aiToolStrategy
);

export { chatService };
