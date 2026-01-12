import { CompletionStrategy } from "./completion.strategy";
import { FeatureFlags } from "../../../config/feature-flags";

export class CompletionStrategyResolver {
  constructor(
    private readonly featureFlags: FeatureFlags,
    private readonly jsonStrategy: CompletionStrategy,
    private readonly streamingStrategy: CompletionStrategy
  ) {}

  resolve(): CompletionStrategy {
    return this.featureFlags.streamingEnabled
      ? this.streamingStrategy
      : this.jsonStrategy;
  }
}
