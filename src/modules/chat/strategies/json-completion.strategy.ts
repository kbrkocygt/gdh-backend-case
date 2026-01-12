import { Response } from "express";
import { CompletionStrategy } from "./completion.strategy";

export class JsonCompletionStrategy implements CompletionStrategy {
  async execute(
    res: Response<any, Record<string, any>>,
    prompt: string
  ): Promise<void> {
  res.status(200).json({ message: prompt });
  }
}
