// modules/chat/policies/pagination.policy.ts
import { FeatureFlags } from "../../../config/feature-flags";

export class PaginationPolicy {
  constructor(private readonly featureFlags: FeatureFlags) {}

  resolveLimit(): number | undefined {
    return this.featureFlags.paginationLimit;
  }
}
