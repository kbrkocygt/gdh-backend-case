// modules/chat/policies/pagination.policy.ts
import { FeatureFlags } from "../../../config/feature-flags";

export class PaginationPolicy {
  constructor(private readonly featureFlags: FeatureFlags) {}

  resolveLimit(): number | undefined {
    // Case requirement: 10-100 aralığı
    const raw = this.featureFlags.paginationLimit;
    const clamped = Math.min(100, Math.max(10, raw));
    return clamped;
  }
}
