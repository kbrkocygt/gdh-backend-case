import type { Response } from "express";

export interface CompletionStrategy {
  execute(res: Response, prompt: string): Promise<void>;
}