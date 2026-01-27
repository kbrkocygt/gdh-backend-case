import { FeatureFlags } from "../../../config/feature-flags";

/**
 * Case requirement:
 * - CHAT_HISTORY_ENABLED=false -> sadece son 10 mesaj
 * - CHAT_HISTORY_ENABLED=true  -> tüm geçmiş
 */
export class ChatHistoryPolicy {
  constructor(private readonly featureFlags: FeatureFlags) {}

  resolveLimit(): number | undefined {
    return this.featureFlags.chatHistoryEnabled ? undefined : 10;
  }
}
