export type FeatureFlagUpdate = Partial<{
  paginationLimit: number;
  chatHistoryEnabled: boolean;
  streamingEnabled: boolean;
  aiToolsEnabled: boolean;
}>;

export class FeatureFlags {
  private static instance: FeatureFlags;

  // Internal state (private)
  private paginationLimitValue = 10;
  private chatHistoryEnabledValue = false;
  private streamingEnabledValue = true;
  private aiToolsEnabledValue = true;

  private constructor() {}

  public static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }
    return FeatureFlags.instance;
  }

  // ===== READ (getter) =====

  get paginationLimit(): number {
    return this.paginationLimitValue;
  }

  get chatHistoryEnabled(): boolean {
    return this.chatHistoryEnabledValue;
  }

  get streamingEnabled(): boolean {
    return this.streamingEnabledValue;
  }

  get aiToolsEnabled(): boolean {
    return this.aiToolsEnabledValue;
  }

  // ===== UPDATE (runtime change) =====

  update(flags: FeatureFlagUpdate): void {
    if (flags.paginationLimit !== undefined) {
      this.paginationLimitValue = flags.paginationLimit;
    }

    if (flags.chatHistoryEnabled !== undefined) {
      this.chatHistoryEnabledValue = flags.chatHistoryEnabled;
    }

    if (flags.streamingEnabled !== undefined) {
      this.streamingEnabledValue = flags.streamingEnabled;
    }

    if (flags.aiToolsEnabled !== undefined) {
      this.aiToolsEnabledValue = flags.aiToolsEnabled;
    }
  }
}

export const FEATURE_FLAGS = FeatureFlags.getInstance();