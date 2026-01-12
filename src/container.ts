import { ChatService } from "./modules/chat/chat.service";
import { PostgresChatRepository } from "./modules/chat/chat-repository.pg";

import { JsonCompletionStrategy } from "./modules/chat/strategies/json-completion.strategy";
import { StreamingCompletionStrategy } from "./modules/chat/strategies/streaming-completion.strategy";

import { MockAiToolStrategy } from "./modules/chat/strategies/mock-ai-tool.strategy";
import { CompletionStrategyResolver } from "./modules/chat/strategies/completion-strategy.resolver";

import { FEATURE_FLAGS } from "./config/feature-flags";
import { PaginationPolicy } from "./modules/chat/policies/pagination.policy";

// Repository
const chatRepository = new PostgresChatRepository();

// Strategies
const jsonStrategy = new JsonCompletionStrategy();
const streamingStrategy = new StreamingCompletionStrategy();

// AI Tool
const aiToolStrategy = new MockAiToolStrategy();

const paginationPolicy = new PaginationPolicy(FEATURE_FLAGS);

// Resolver
const completionStrategyResolver = new CompletionStrategyResolver(
  FEATURE_FLAGS,
  jsonStrategy,
  streamingStrategy
);

// Service
export const chatService = new ChatService(
  chatRepository,
  paginationPolicy,
  completionStrategyResolver,
  aiToolStrategy
);
